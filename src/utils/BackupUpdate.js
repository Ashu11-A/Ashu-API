const { exec } = require('child_process')
const SimplDB = require('simpl.db')

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes'
    }
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]]
}

function getBackupSize(path, callback) {
    const command = `du -sb ${path}`

    exec(command, (error, stdout) => {
        if (error) {
            callback(null, 'Error 500')
        } else {
            const [size] = stdout.split('\t')
            const [folderSizeMB, Type] = formatBytes(Number(size))
            callback(null, folderSizeMB, Type)
        }
    })
}


function BackupUpdate() {
    const db = SimplDB({
        dataFile: './status.json'
    })
    const dataAtual = new Date()
    dataAtual.setDate(dataAtual.getDate() - 2)
    // Formatar a data no formato "YYYY-MM-DD"
    const dataAnterior = dataAtual.toISOString().split('T')[0]
    const folderPath = '/mnt/matheus/Backup/ptero/volumes'
    const filePath = '/mnt/matheus/Backup/Servidores-' + dataAnterior + '.tar.bz2'

    getBackupSize(folderPath, (error, folderSize, folderType) => {
        if (error) {
            console.log(error)
        }
        getBackupSize(filePath, (error, fileSize, fileType) => {
            if (error) {
                console.log(error)
            }
            console.log(`Informações do sistema atualizadas.\nBackup Espelhado: ${folderSize}\nBackup Completo: ${fileSize}`)
            db.set('backup', {
                'espelhado': folderSize + ' ' + folderType,
                'completo': fileSize + ' ' + fileType,
                folderSize,
                folderType,
                fileSize,
                fileType
            });
            db.save()
        })
    })
}

module.exports = { BackupUpdate }