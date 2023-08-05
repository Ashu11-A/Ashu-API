const SimplDB = require('simpl.db')
const axios = require('axios')

async function Last24H (port) {
  try {
    await axios.get(`http://localhost:${port}/backup-size`)
    const db = new SimplDB({
      dataFile: './status.json'
    })

    const currentHour = new Date().getHours()
    const Dados = db.get('backup') || 0
    const hourlyData = db.get('hourlyData') || []

    // Verifica se os dados já foram adicionados para a hora atual
    const existingEntryIndex = hourlyData.findIndex(entry => entry.time === `${currentHour}h`)

    if (existingEntryIndex !== -1) {
      // Sobrescreve os dados existentes para a hora atual
      hourlyData[existingEntryIndex] = {
        time: `${currentHour}h`,
        title: 'Completo',
        type: Dados.fileType,
        size: Dados.fileSize
      }

      hourlyData[existingEntryIndex + 1] = {
        time: `${currentHour}h`,
        title: 'Espelhado',
        type: Dados.folderType,
        size: Dados.folderSize
      }
    } else {
      hourlyData.push({
        time: `${currentHour}h`,
        title: 'Completo',
        type: Dados.fileType,
        size: Dados.fileSize
      })

      hourlyData.push({
        time: `${currentHour}h`,
        title: 'Espelhado',
        type: Dados.folderType,
        size: Dados.folderSize
      })
    }

    // Manter apenas as últimas 24 entradas de dados
    const maxEntries = 24
    while (hourlyData.length > maxEntries) {
      hourlyData.shift()
    }

    db.set('hourlyData', hourlyData)
    db.save()
    console.log('Dados salvos com sucesso:', hourlyData) // Verifique se os dados são exibidos corretamente
  } catch (error) {
    console.error('Erro ao salvar os dados:', error)
  }
}

module.exports = { Last24H }
