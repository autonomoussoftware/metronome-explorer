import { Router } from 'express'
import event from './event'

const router = Router()

router.use(event)

export default router
