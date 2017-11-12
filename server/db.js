const Datastore = require('nedb-core')
const db = new Datastore({ filename: './data.db', autoload: true })

db.ensureIndex({ fieldName: 'balance' }, function (err) {
  if (err) {
    console.log('Error creating balance db index:', err)
  }
})

db.ensureIndex({ fieldName: 'timestamp' }, function (err) {
  if (err) {
    console.log('Error creating timestamp db index:', err)
  }
})

db.ensureIndex({ fieldName: 'args._from' }, function (err) {
  if (err) {
    console.log('Error creating _from db index:', err)
  }
})

db.ensureIndex({ fieldName: 'args._to' }, function (err) {
  if (err) {
    console.log('Error creating _to db index:', err)
  }
})

export default db
