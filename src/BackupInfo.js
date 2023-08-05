const SimplDB = require('simpl.db')

function BackupInfo(req, res) {
    const db = SimplDB({
        dataFile: './status.json'
    })

    res.json({
        'backup': db.get('backup'),
        'hourlyData': db.get('hourlyData')
    })
}

module.exports = { BackupInfo }