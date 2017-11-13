import { Router } from 'express'
const router = Router()

router.get('/account/:id/:offset?', (req, res, next) => {
  const db = req.app.get('db')
  req.params.offset = req.params.offset ? parseInt(req.params.offset) : 0

  db.find({ _id: req.params.id })
    .exec((err, balance) => {
      if (err) { return next(err) }

      if (balance.length === 0 || !balance[0]._id) {
        return next({message: 'Account not found!'})
      }

      db.find({
        $or: [
          { 'args._from': req.params.id },
          { 'args._to': req.params.id }
        ]
      })
        .sort({ timestamp: -1 })
        .skip(req.params.offset)
        .limit(50)
        .exec((err, events) => {
          if (err) { return next(err) }

          res.json({
            balance: balance[0],
            events: events,
            offset: req.params.offset,
            stepSize: 50
          })
        })
    })
})

router.get('/account/:offset?', (req, res, next) => {
  const db = req.app.get('db')
  req.params.offset = req.params.offset ? parseInt(req.params.offset) : 0

  db.find({ balance: { $exists: true } })
    .sort({ _id: 1 })
    .skip(req.params.offset)
    .limit(50)
    .exec((err, accounts) => {
      if (err) { return next(err) }

      res.json({ accounts: accounts, offset: req.params.offset, stepSize: 50 })
    })
})

export default router
