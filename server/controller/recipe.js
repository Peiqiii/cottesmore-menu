const { exec } = require('../db/mysql')
const xss = require('xss')
const fs = require('fs')
const { dir } = require('console')

// get recipe list 
const getList = async (author, keyword) => {
    let sql = `select * from recipes where 1=1 `
    if(author){
        sql += `and author = '${author}' `
    }
    if(keyword){
        sql += `and recipe_name like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return await exec(sql)
}

// get recipe details
const getDetail = async (id) => {
    let sql = `select * from recipes where id = '${id}';`
    const rows = await exec(sql)
    console.log(rows[0])
    return rows[0]
}

// create a new recipe
const newRecipe = async (recipeData = {}) => {

    // A new recipe must include recipe_name, author, and create time
    const recipe_name = xss(recipeData.recipe_name)
    const author = xss(recipeData.author)
    const createtime = Date.now()
    
    // record how many statements 
    let num = 0
    let sql = `
        insert into recipes (recipe_name, createtime, author)
        values ('${recipe_name}', ${createtime}, '${author}');
    `
    num++

    // A new recipe could include img_name, tag, link, direction
    if(recipeData.img_name){
        num++
        const img_name = xss(recipeData.img_name)
        sql += `update recipes set img_name = '${img_name}' where recipe_name = '${recipe_name}';`
    }
    if(recipeData.tag){
        num++
        const tag = xss(recipeData.tag)
        sql += `update recipes set tag = ('${tag}') where recipe_name = '${recipe_name}';`
    }
    if(recipeData.link){
        num++
        const link = xss(recipeData.link)
        sql += `update recipes set link = ('${link}') where recipe_name = '${recipe_name}';`
    }
    if(recipeData.direction){
        num++
        const direction = xss(recipeData.direction)
        sql += `update recipes set direction = ('${direction}') where recipe_name = '${recipe_name}';`
    }

    const insertData = await exec(sql, num)
    return {id: insertData[0].insertId}
}

// create a new recipe img
const newRecipeImg = async (fileName) => {
    const imgName = xss(fileName)

    let sql = `
        update recipes set img_name = '${imgName}' where id = 2;
    `

    const insertData = await exec(sql)
    return { 'id': insertData.insertId }
}

// update a recipe
const updateRecipe = async (id, recipeData = {}) => {
    const {recipe_name, direction} = recipeData
    let sql = `update recipes set recipe_name = '${recipe_name}', direction = '${direction}' where id = '${id}'`
    const updateData = await exec(sql)
    if(updateData.affectedRows > 0){
        return true
    }
    return false
}

// delete a recipe
const delRecipe = async (id, author) => {
    let sql = `delete from recipes where id = '${id}' and author = '${author}'`
    const deleteData = await exec(sql)
    if(deleteData.affectedRows > 0){
        return true
    }
    return false
}

module.exports = {
    getList, 
    getDetail,
    newRecipe,
    newRecipeImg,
    updateRecipe,
    delRecipe
}