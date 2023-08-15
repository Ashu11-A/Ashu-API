import { Router } from "express"
import { SystemInfo } from '@SystemInfo'
import { BackupInfo } from "@BackupInfo"

const router: Router = Router()

router.get("/system-info", SystemInfo)
router.get('/backup-size', BackupInfo)

export { router }