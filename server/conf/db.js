const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if(env === 'dev'){
    MYSQL_CONF = {
    }

    REDIS_CONF = {
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '',
        database: ''
    }
    
    REDIS_CONF = {
        host: 'localhost',
        port: ''
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
