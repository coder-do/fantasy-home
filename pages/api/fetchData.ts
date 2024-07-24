import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const jsonFilePath = path.join(process.cwd(), 'public', 'data.json');

  let data;
  try {
    data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  } catch (error) {
    return res.status(500).json({ message: 'Error reading data file' });
  }

  res.status(200).json(data);
}
