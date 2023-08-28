import { Request, Response } from 'express'
import si from 'systeminformation'

class SystemExpress {
  public async get(req: Request, res: Response) {
    try {
      const data = await si.get({
        cpu: '*',
        mem: '*',
        osInfo: '*',
        diskLayout: '*',
        battery: '*'
      })
      return res.json(data)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Erro 500: Internal Server Error' })
    }
  }
}
export const SystemInfo = new SystemExpress();
