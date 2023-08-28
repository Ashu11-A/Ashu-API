import { exec } from 'child_process'
import { Database } from 'simpl.db'
import dotenv from 'dotenv'
dotenv.config()
import * as fs from 'fs'

function formatBytes(bytes: number, decimals = 2): [number, string] {
  if (bytes === 0) {
    return [0, 'Bytes']
  }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]]
}

function getBackupSize(
  path: string,
  callback: (error: Error | null, size: string, type: string) => void
) {
  const command = `du -sb ${path}`

  exec(command, (error, stdout) => {
    if (error) {
      callback(error, '0', 'Bytes')
    } else {
      const size = parseInt(stdout.trim().split('\t')[0])
      const [folderSizeMB, Type] = formatBytes(size)
      callback(null, folderSizeMB.toString(), Type)
    }
  })
}

export function BackupUpdate() {
  const db = new Database({
    dataFile: './status.json',
  })

  const folderPath = String(process.env.folderPath)
  const filesPath = String(process.env.filesPath)

  getBackupSize(folderPath, (error, folderSize, folderType) => {
    if (error) {
      console.log(error)
      return
    }

    fs.readdir(filesPath, (readDirError, files) => {
      if (readDirError) {
        console.error(readDirError)
        return
      }

      const tarBz2Files = files.filter((file) => file.endsWith('.tar.bz2'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataFiles: any = []

      tarBz2Files.forEach((file) => {
        const filePath = `${filesPath}/${file}`
        getBackupSize(filePath, (error, fileSize, fileType) => {
          if (error) {
            console.log(error)
          } else {
            dataFiles.push({
              file,
              size: fileSize,
              type: fileType,
            })
          }
          db.set('backup', {
            espelhado: folderSize + ' ' + folderType,
            completo: dataFiles[0].size + ' ' + dataFiles[0].type,
            syncBackup: {
              folderSize,
              folderType,
            },
            fullBackup: {
              ...dataFiles
            }
          })
          db.save()
          console.log(db.get('backup'))
        })
      })
    })
  })
}
