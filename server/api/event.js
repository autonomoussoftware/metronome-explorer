import { Router } from 'express'
const router = Router()

router.get('/event', function (req, res, next) {
  const db = req.app.get('db')

  db.find({})
    .sort({ timestamp: -1 })
    .limit(10)
    .exec((err, events) => {
      if (err) { return next(err) }

      res.json(events)
    })
})

router.get('/event/:id', (req, res, next) => {
  const db = req.app.get('db')

  db.find({_id: req.params.id})
    .exec((err, events) => {
      if (err) { return next(err) }

      if (events.length === 0 || !events[0]._id) {
        return res.send(404)
      }

      res.json(events[0])
    })
})

export default router
