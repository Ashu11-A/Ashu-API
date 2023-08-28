<div align="center">

![Comitts Year](https://img.shields.io/github/commit-activity/y/Ashu11-A/Ashu-API?colorA=302D41&colorB=f9e2af&style=for-the-badge)

![Last-Comitt](https://img.shields.io/github/last-commit/Ashu11-A/Ashu-API?style=for-the-badge&colorA=302D41&colorB=b4befe)
![Contributors](https://img.shields.io/github/contributors-anon/Ashu11-A/Ashu-API?style=for-the-badge&colorA=302D41&colorB=b4befe)


</div>

<h1 align="center">Ashu - API</h1>
<h5 align="center">
    <strong>
        Coisas que preciso expor na rede mundial de computadores
    </strong>
</h5>

## 👨‍💻 - Pacotes usados

- [axios](https://axios-http.com/)
- [express](https://expressjs.com/)
- [jest](https://jestjs.io/)
- [simpl.db](https://simpldb.js.org/)
- [supertest](https://www.npmjs.com/package/supertest)
- [systeminformation](https://systeminformation.io/)

## 🛣️ - Rotas

- /backup-size:

```json
{
    "backup": {
        "espelhado": "10.93 GB",
        "completo": "4.12 GB",
        "syncBackup": {
            "folderSize": "10.93",
            "folderType": "GB"
        },
        "fullBackup": {
            "0": {
                "file": "Servidores-2023-08-24.tar.bz2",
                "size": "4.12",
                "type": "GB"
            }
        }
    },
    "hourlyData": [
        {
            "time": "18h",
            "title": "Completo",
            "type": "GB",
            "size": "4.12"
        },
        {
            "time": "18h",
            "title": "Espelhado",
            "type": "GB",
            "size": "10.93"
        }
    ]
}
```

- /system-info:

```js
{
    "cpu": {...},
    "mem": {...},
    "osInfo": {...},
    "diskLayout": {...},
    "battery": {...}
}
```
