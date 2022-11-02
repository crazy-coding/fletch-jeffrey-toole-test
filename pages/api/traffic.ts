import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: any, res: any) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/traffic.json', 'utf8');
    res.status(200).json(fileContents);
  } catch (e) {
    res.status(500).json(e)
  }
}