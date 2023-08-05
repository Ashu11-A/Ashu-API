const express = require('express')
const app = express()
const { systemInfo } = require('./src/systemInfo')
const { BackupInfo } = require('./src/BackupInfo')
const { BackupUpdate } = require('./src/utils/BackupUpdate')
const { Last24H } = require('./src/hourlyData')
const port = 3001

BackupUpdate()
Last24H(port)
setInterval(async () => {
  BackupUpdate()
  await Last24H(port)
}, 1000 * 60 * 30);

app.get('/backup-size', BackupInfo)
app.get('/system-info', systemInfo)


app.listen(port, () => {
  console.log(`Servidor listado em http://localhost:${port}`)
})
