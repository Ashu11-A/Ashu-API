const folderPath = '/mnt/matheus/Backup/ptero/volumes'
// Obter a data atual
const dataAtual = new Date()
// Subtrair um dia da data atual
dataAtual.setDate(dataAtual.getDate() - 2)
// Formatar a data no formato "YYYY-MM-DD"
const dataAnterior = dataAtual.toISOString().split('T')[0]
// Gerar o nome do arquivo desejado
const filePath = '/mnt/matheus/Backup/Servidores-' + dataAnterior + '.tar.bz2'
const { exec } = require('child_process')

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes'
    }
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function getBackupSize(path, callback) {
    const command = `du -sb ${path}`

    exec(command, (error, stdout) => {
        if (error) {
            callback(null, error)
        } else {
            const [size] = stdout.split('\t')
            const folderSizeMB = formatBytes(Number(size))
            callback(null, folderSizeMB)
        }
    })
}


function BackupInfo(req, res) {
    getBackupSize(folderPath, (error, folderSize) => {
        if (error) {
            res.status(500).json({ error })
        }
        getBackupSize(filePath, (error, fileSize) => {
            if (error) {
                res.status(500).json({ error })
            }
            console.log(`Informações do sistema atualizadas.\nBackup Espelhado: ${folderSize}\nBackup Completo: ${fileSize}`)
            res.json({
                backup: {
                    espelhado: folderSize,
                    completo: fileSize
                }
            })
        })
    })
}

module.exports = { BackupInfo }