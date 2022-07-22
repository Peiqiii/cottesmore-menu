const { SuccessModel, ErrorModel } = require('../model/recipeModel')
const { getList, getDetail, newRecipe, newRecipeImg, updateRecipe, delRecipe} = require('../controller/recipe')
const loginCheck = require('../middleware/loginCheck')
const router = require('koa-router')()
const fse = require('fs-extra')
const path = require('path')

router.prefix('/api/cottesmore-menu')

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    // check administrator to display specific list
    // if(ctx.query.isadmin){
    //     //check login status
    //     if(!ctx.session.username) {
    //         ctx.body = new ErrorModel('not signed in')
    //         return
    //     }

    //     author = ctx.session.username
    // }

    console.log('test')
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
    const detailData = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(detailData)
})

router.post('/new', loginCheck, async (ctx, next) => {
    // append to author to request body
    ctx.request.body.author = ctx.session.username
    console.log(ctx.request.body)

    // save the image
    if(ctx.request.files.file){
        const filePath = ctx.request.files.file.filepath
        const fileName = ctx.request.files.file.originalFilename
        const dest = path.resolve(__dirname, '../../web/images', fileName)
        await fse.move(filePath, dest, {overwrite: true})

        // append image name to request body 
        ctx.request.body.img_name = fileName
    }

    const newData = await newRecipe(ctx.request.body)
    ctx.body = new SuccessModel(newData)
})

// router.post('/newimage', loginCheck, async(ctx, next) => {
//     // save the image
//     const filePath = ctx.request.files.file.filepath
//     const fileName = ctx.request.files.file.originalFilename
//     const dest = path.resolve(__dirname, '../public/images', fileName)
//     await fse.move(filePath, dest)

//     const newImgData = await newRecipeImg(fileName)
//     ctx.body = new SuccessModel(newImgData)
// })

router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateRecipe(ctx.query.id, ctx.request.body)
    if(val){
        ctx.body = new SuccessModel('update success')
        return
    }
    ctx.body = new ErrorModel('update failed')
})

router.post('/del', loginCheck, async (ctx, next) => {
    const val = await delRecipe(ctx.query.id, ctx.session.username)
    if(val){
        ctx.body = new SuccessModel('delete success')
        return
    }
    ctx.body = new ErrorModel('delete failed')
})

module.exports = router