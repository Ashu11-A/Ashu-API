import { App } from "./app"
import dotenv from "dotenv"
import { BackupUpdate } from '@/utils/BackupUpdate'
import { Last24H } from '@/utils/hourlyData'
dotenv.config()

new App().server.listen(process.env.PORT, () => {
  console.log(`Servidor listado em http://localhost:${process.env.PORT}`)
})

function UpdateInfos(): any {
  BackupUpdate()
  // Aqui o setTimeout é essencial para que os dados sejam atualizados antes que ele atualize
  setTimeout(async () => {
    Last24H(Number(process.env.PORT))
  }, 10000);


  setInterval(() => {
    BackupUpdate()
    // Mesmo comentário acima
    setTimeout(async () => {
      Last24H(Number(process.env.PORT))
    }, 10000);
  }, 1000 * 60 * 30);
}

UpdateInfos()
