import { Request, Response } from 'express'
import { Database } from 'simpl.db'

class BackupExpress {
  public get(req: Request, res: Response) {
    const db = new Database({
      dataFile: './status.json'
    })
    try {
      return res.json({
        backup: db.get('backup'),
        hourlyData: db.get('hourlyData')
      })
    } catch (err) {
      return res.status(500).send({ err: "Houve um erro na requisição" })
    }
  }
}

export const BackupInfo = new BackupExpress()
