const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author = '${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return await exec(sql)
}

const getDetail = async (id) => {
    let sql = `select * from blogs where id = '${id}';`
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    //blogData是新建的博客对象数据，包括title，content，createtime，author
    
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = xss(blogData.author)

    //console.log(title)
    const createtime = Date.now()
    let sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createtime}, '${author}');
    `
    const insertData = await exec(sql)
    return { 'id': insertData.insertId }
}

const updateBlog = async (id, blogData = {}) => {
    const {title, content} = blogData
    let sql = `update blogs set title = '${title}', content = '${content}' where id = '${id}'`
    const updateData = await exec(sql)
    if(updateData.affectedRows > 0){
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    let sql = `delete from blogs where id = '${id}' and author = '${author}'`
    const deleteData = await exec(sql)
    if(deleteData.affectedRows > 0){
        return true
    }
    return false
}

module.exports = {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}