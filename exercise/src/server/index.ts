import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import mysql from 'mysql2/promise'

const DataSchema = z.object({
  bigText: z.string(),
  DividedQuality: z.number(),
  pdf: z.array(z.object({
    name: z.string(),
    path: z.string(),
    size: z.number()
  })),
  dateList: z.object({
    firstDate: z.string(),
    datesArray: z.array(z.string())
  })
});

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'ex',
}

export const appRouter: any = router({
  post: publicProcedure.input(DataSchema).mutation(async ({ input }) => {
    const { bigText, DividedQuality, pdf, dateList } = input;

    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established');

    await connection.beginTransaction();
    console.log('Transaction started');

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

    return JSON.stringify({ message: 'Form data saved successfully' }), { status: 200 }
  })
})
export type AppRouter = typeof appRouter
