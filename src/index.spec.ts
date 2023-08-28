import { expect, jest, test, describe, it } from '@jest/globals';
import { App } from "./app"
import request from 'supertest';

describe('Test API', () => {
    it('BackupInfo', async () => {
        const res = await request(new App().server).get('/backup-size')
        expect(res.status).toEqual(200)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('backup')
    })

    it('SystemInfo', async () => {
        const res = await request(new App().server).get("/system-info")
        expect(res.status).toEqual(200)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('cpu')

    })
})