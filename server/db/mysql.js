const mysql = require('mysql2')
const { MYSQL_CONF } = require('../conf/db')

//create link object
MYSQL_CONF.multipleStatements = true
const con = mysql.createConnection(MYSQL_CONF)

//connect
con.connect()

//excute sqls
const exec = (sql, num) => {
    const arr = Array.from({length: num}, (item, index) => index)

    const promise = new Promise((resolve, reject) => {
        con.query(sql, arr, (err, results) => {
            if(err) reject(err)
            resolve(results)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}