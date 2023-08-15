import { Request, Response } from 'express'
import { Database } from 'simpl.db'

export function BackupInfo(req: Request, res: Response) {
  const db = new Database({
    dataFile: './status.json'
  })
  try {
    return res.json({
      backup: db.get('backup'),
      hourlyData: db.get('hourlyData')
    })
  } catch {
    return res.status(500).send({ err: "Houve um erro na requisição" })
  }
}
