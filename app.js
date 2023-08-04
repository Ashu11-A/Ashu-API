const express = require('express')
const app = express()
const { systemInfo } = require('./src/systemInfo')
const { BackupInfo } = require('./src/BackupInfo')
const port = 3001

app.get('/backup-size', BackupInfo)

app.get('/system-info', systemInfo)


app.listen(port, () => {
  console.log(`Servidor listado em http://localhost:${port}`)
})
