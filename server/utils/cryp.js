const crypto = require('crypto')

const SECRET_KEY = 'fwic39#cv_94'

function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function genPassword(password){
    password = `password='${password}'&secretKey='${SECRET_KEY}'`
    return md5(password)
}

console.log(genPassword('JKLee&&36'))

module.exports = {
    genPassword
}