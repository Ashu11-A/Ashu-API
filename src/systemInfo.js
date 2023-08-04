const si = require('systeminformation')
async function systemInfo (req, res) {
    try {
        const data = await si.get({
            cpu: '*',
            mem: '*',
            osInfo: '*',
            diskLayout: '*',
            battery: '*'
        })
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Erro 500: Internal Server Error' })
    }
}
module.exports = { systemInfo }