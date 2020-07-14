const mongoose = require('mongoose')

const SERVER:string = '127.0.0.1:2701'
const DATABASE:string = 'test'


interface db {
    [key: string]: boolean
}

const CONFIG: db = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true

}

class Database {
    constructor () {
        this._connect()
    }

    _connect () : void {
        mongoose.connect(`mongodb://${SERVER}/${DATABASE}`, CONFIG)
        .then( () => {
            console.log('Database connection successful')
        })
        .catch( err => {
            console.error('Database connection error', err)
        })
    }
}

module.exports = new Database()