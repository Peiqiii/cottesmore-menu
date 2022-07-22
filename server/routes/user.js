const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/recipeModel");
const router = require('koa-router')()

router.prefix('/api/cottesmore-menu')

router.post('/login', async (ctx, next) => {
    const {username, password} = ctx.request.body
    //console.log(ctx.request.rawBody)
    //console.log(username)
    const data = await login(username, password)
    if(data.username){
        ctx.session.username = username
        ctx.session.password = password

        ctx.body = new SuccessModel()
    }else{
        ctx.body = new ErrorModel('Login Failed')
    }

})

module.exports = router