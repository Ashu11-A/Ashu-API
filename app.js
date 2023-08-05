const express = require('express')
const app = express()
const { systemInfo } = require('./src/systemInfo')
const { BackupInfo } = require('./src/BackupInfo')
const { Last24H } = require('./src/hourlyData')
const port = 3001

Last24H(port)
setInterval(() => {
  Last24H(port)
}, 1000 * 60 * 30);

app.get('/backup-size', BackupInfo)
app.get('/system-info', systemInfo)


app.listen(port, () => {
  console.log(`Servidor listado em http://localhost:${port}`)
})
