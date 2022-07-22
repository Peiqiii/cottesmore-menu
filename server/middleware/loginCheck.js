const { ErrorModel } = require('../model/recipeModel')

module.exports = async (ctx, next) => {
    if(ctx.session.username){
        await next()
        return
    }
    ctx.body = new ErrorModel('not signed in')
}