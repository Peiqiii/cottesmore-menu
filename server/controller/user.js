const { exec, escape } = require("../db/mysql")
const { genPassword } = require("../utils/cryp")

const login = async (username, password) => {
    
    password = genPassword(password) 
    username = escape(username)
    password = escape(password)
    
    const sql = `select username from user where username = ${username} and password = ${password}`
    console.log('********************')
    
    const rows = await exec(sql)
    console.log(rows)
    return rows[0] || {}
}

module.exports = {
    login
}