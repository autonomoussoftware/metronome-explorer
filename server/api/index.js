import { Router } from 'express'

import event from './event'
import account from './account'

const router = Router()

router.use(event)
router.use(account)

export default router
