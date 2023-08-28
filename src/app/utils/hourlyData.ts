import { Database } from 'simpl.db'
import axios from 'axios'
export async function Last24H(port: number) {
  try {
    await axios.get(`http://localhost:${port}/backup-size`)
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const db: any = new Database({
      dataFile: './status.json'
    })

    const currentHour = new Date().getHours()
    const { syncBackup, fullBackup } = db.get('backup')
    const { folderSize, folderType } = syncBackup
    const hourlyData = db.get('hourlyData') || []

    // Verifica se os dados já foram adicionados para a hora atual
    const existingEntryIndex = hourlyData.findIndex((entry: { time: string }) => entry.time === `${currentHour}h`)

    if (existingEntryIndex !== -1) {
      // Sobrescreve os dados existentes para a hora atual
      hourlyData[existingEntryIndex] = {
        time: `${currentHour}h`,
        title: 'Completo',
        type: fullBackup[0].type,
        size: fullBackup[0].size
      }

      hourlyData[existingEntryIndex + 1] = {
        time: `${currentHour}h`,
        title: 'Espelhado',
        type: folderType,
        size: folderSize
      }
    } else {
      hourlyData.push({
        time: `${currentHour}h`,
        title: 'Completo',
        type: fullBackup[0].type,
        size: fullBackup[0].size
      })

      hourlyData.push({
        time: `${currentHour}h`,
        title: 'Espelhado',
        type: folderType,
        size: folderSize
      })
    }

    // Manter apenas as últimas 24 entradas de dados
    const maxEntries = 24
    while (hourlyData.length > maxEntries) {
      hourlyData.shift()
    }

    db.set('hourlyData', hourlyData)
    db.save()
    console.log('Dados salvos com sucesso:', hourlyData)
  } catch (error) {
    console.error('Erro ao salvar os dados:', error)
  }
}