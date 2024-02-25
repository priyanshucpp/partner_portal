// pages/api/adminAssignAccess.js

import { createConnection } from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { user, file, access } = req.body;

      // Create a MySQL connection
      const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'partner_portal_registration',
      });

      // Update user_file_access table
      const [result] = await connection.execute(
        'INSERT INTO user_file_access (user_id, file_id, access_level) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE access_level = ?',
        [user, file, access, access]
      );

      connection.end(); // Close the MySQL connection

      res.status(200).json({ message: 'Access assigned successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
