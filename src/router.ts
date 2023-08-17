import { Router } from "express"
import { SystemInfo } from '@/SystemInfo'
import { BackupInfo } from "@/BackupInfo"

const router: Router = Router()

router.get("/system-info", SystemInfo.get)
router.get('/backup-size', BackupInfo.get)

export { router }