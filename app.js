const express = require('express');
const si = require('systeminformation');

const app = express();
const port = 3000;

app.get('/system-info', async (req, res) => {
    try {
        const data = await si.get({
            cpu: '*',
            mem: '*',
            osInfo: '*',
            diskLayout: '*',
            battery: '*'
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro 500: Internal Server Error' });
    }
});

setInterval(async () => {
    try {
        const data = await si.get({
            cpu: '*',
            mem: '*',
            osInfo: '*',
            diskLayout: '*',
            battery: '*'
        });
        console.log('Informações do sistema atualizadas.');
    } catch (err) {
        console.log(err);
    }
}, 5000);

app.listen(port, () => {
    console.log(`Servidor listado em http://localhost:${port}`);
});