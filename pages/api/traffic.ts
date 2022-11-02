import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: any, res: any) {
  console.log(process.cwd())
  const jsonDirectory = path.join(process.cwd(), 'public/json');
  const fileContents = await fs.readFile(jsonDirectory + '/traffic.json', 'utf8');
  res.status(200).json(fileContents);
}