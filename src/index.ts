import { App } from "./app"
import dotenv from "dotenv"
import { BackupUpdate } from '@utils/BackupUpdate'
import { Last24H } from '@utils/hourlyData'
dotenv.config()

new App().server.listen(process.env.PORT, () => {
  console.log(`Servidor listado em http://localhost:${process.env.PORT}`)
})

BackupUpdate()
Last24H(Number(process.env.PORT))

setInterval(async () => {
  BackupUpdate()
  Last24H(Number(process.env.PORT))
}, 1000 * 60 * 30);
