const config = require('../config/config')
// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const url = config.DB.URL
const dbName = config.DB.NAME
const username = config.DB.USER
const password = config.DB.PASS
const mongoType = config.DB.TYPE
// console.log("pre connect db");
async function connectionDB() {

    if (mongoType == "MONGO_SERVER") {
		console.log(url)
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection.db
        global.DB = db
    } else {
        try {
            await mongoose.connect(`${url}/${dbName}`, {
                authSource: "admin",
                user: username,
                pass: password,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                autoReconnect: true,
                socketTimeoutMS: 360000
            })
            // const { db } = mongoose.connection()
            const db = mongoose.connection.db
            global.DB = db
        } catch (err) {
            if (err) console.log(err)
        }
    }


}

connectionDB()
console.log("after connect db.");

// async function connectionDB_v2() {
//     try {
//         await mongoose.connect(`${url}/${dbName}`, {
//                 authSource: "admin",
//                 user: username,
//                 pass: password,
//                 useNewUrlParser: true,
//                 useFindAndModify: false,
//                 useCreateIndex: true,
//                 autoReconnect: true,
//                 socketTimeoutMS: 360000
//             })
//             // const { db } = mongoose.connection()
//         const db_v2 = mongoose.connection.db
//         global.DB_v2 = db_v2
//     } catch (err) {
//         if (err) console.log(err)
//     }
// }

// connectionDB_v2()

// MongoClient.connect(url, function(err, client) {
//   if(err) return console.log("Mongo Error ",err)
//   global.DB = client.db(dbName)
// })