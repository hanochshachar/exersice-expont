import { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'ex',
}

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }

  const { bigText, DividedQuality, pdf, dateList } = await req.json();
  let connection: mysql.Connection | null = null;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established');
    console.log(req.body);

    // Start transaction
    await connection.beginTransaction();
    console.log('Transaction started');

    // Insert into info table
    const [infoResult] = await connection.execute<mysql.ResultSetHeader>(
      'INSERT INTO info (bigText, DividedQuality) VALUES (?, ?)',
      [bigText, DividedQuality]
    );
    const infoId = infoResult.insertId;
    console.log('Inserted into info table, ID:', infoId);

    // Insert into pdf table
    for (const p of pdf) {
      const [pdfResult] = await connection.execute<mysql.ResultSetHeader>(
        'INSERT INTO pdf (name, path, size, base_id) VALUES (?, ?, ?, ?)',
        [p.name, p.path, p.size, infoId]
      );
      console.log('Inserted into pdf table:', pdfResult);
    }

    // Insert the firstDate into the dates table
    const [firstDateResult] = await connection.execute<mysql.ResultSetHeader>(
      'INSERT INTO dates (date, base_id) VALUES (?, ?)',
      [dateList.firstDate, infoId]
    );
    console.log('Inserted firstDate into dates table:', firstDateResult);

    const queryDate = 'INSERT INTO dates (date, base_id) VALUES (?, ?)';
    for (const date of dateList.datesArray) {
      const [dateResult] = await connection.execute<mysql.ResultSetHeader>(queryDate, [date, infoId]);
      console.log('Inserted date into dates table:', dateResult);
    }

    await connection.commit();
    if (connection) await connection.end();

    console.log('Transaction committed');
    return new NextResponse(JSON.stringify({ message: 'Form data saved successfully' }), { status: 200 });
  } catch (error: any) {
    if (connection) await connection.rollback();
    console.error('Error during database operation:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to save form data', details: error.message }), { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await POST(req as any);
  res.status(response.status).send(await response.text());
}
