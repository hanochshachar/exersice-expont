import { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'ex',
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  'use server'
  console.log(req);
  
  if (req.method === 'POST') {
   
    
    const { bigText, DividedQuality, pdf, dateList } = req.body
  
    let connection: mysql.Connection | null = null
    try {
      connection = await mysql.createConnection(dbConfig)
      console.log('Database connection established')

      // Start transaction
      await connection.beginTransaction()
      console.log('Transaction started')

      // Insert into info table
      const [infoResult] = await connection.execute<mysql.ResultSetHeader>(
        'INSERT INTO info (bigText, DividedQuality) VALUES (?, ?)',
        [bigText, DividedQuality]
      )
      const infoId = infoResult.insertId
      console.log('Inserted into info table, ID:', infoId)

      // Insert into pdf table
      for (const p of pdf) {
        const [pdfResult] = await connection.execute(
          'INSERT INTO pdf (name, path, size, infoId) VALUES (?, ?, ?, ?)',
          [p.name, p.path, p.size, infoId]
        )
        console.log('Inserted into pdf table:', pdfResult)
      }

      // Insert the firstDate into the dates table
      const [firstDateResult] = await connection.execute(
        'INSERT INTO dates (date, base_id) VALUES (?, ?)',
        [dateList.firstDate, infoId]
      )
      console.log('Inserted firstDate into dates table:', firstDateResult)

      // Insert each date in datesArray into dates table
      const queryDate = 'INSERT INTO dates (date, base_id) VALUES (?, ?)'
      for (const date of dateList.datesArray) {
        const [dateResult] = await connection.execute(queryDate, [date, infoId])
        console.log('Inserted date into dates table:', dateResult)
      }

      // Commit transaction
      await connection.commit()
      console.log('Transaction committed')

      res.status(200).json({ message: 'Form data saved successfully' })
    } catch (error: any) {
      console.error('Error during database operation:', error)
      if (connection) await connection.rollback()
      res.status(500).json({ error: 'Failed to save form data', details: error.message })
    } finally {
      if (connection) await connection.end()
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
   
  }
}
