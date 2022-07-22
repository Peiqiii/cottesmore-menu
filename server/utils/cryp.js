const crypto = require('crypto')

const SECRET_KEY = ''

function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function genPassword(password){
    password = `password='${password}'&secretKey='${SECRET_KEY}'`
    return md5(password)
}


module.exports = {
    genPassword
}
