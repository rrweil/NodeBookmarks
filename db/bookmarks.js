const bcrypt = require('bcrypt');
const { get } = require('../api');
const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        options: {
            port: 1433,
            instanceName: 'SQLEXPRESS'
        }
    }
});

const add = async (bookmark, user) => {
    bookmark.userId = user.id;
    await knex('bookmarks').insert(bookmark);
}

const getBookmarks = async id => {
    return await knex.from('bookmarks').where({
        userId: id,
    }).select('*');
}

const updateTitle = async data => {
    const id = data.bookmarkId;
    const title = data.title;
    await knex('bookmarks')
        .where({ id })
        .update({ title })
}

const deleteBookmark = async data => {
    const id = data.bookmarkId;
    await knex('bookmarks')
        .where({ id })
        .del()
}

const getTopFiveBookmarks = async () => {
    const bookmarks = await knex.from('bookmarks').select('*');
    const topBookmarks = [];    
    const groupBookmarks = bookmark =>   
    {
        topBookmark = bookmarks.find(topBookmark => topBookmark.url === bookmark.url);
        if (!topBookmark.count){
            topBookmark.count = 0;
            topBookmarks.push(topBookmark)
        }
        topBookmark.count++;
    }
    bookmarks.forEach(groupBookmarks);
    return topBookmarks.sort(function(a, b){return b.count-a.count}).slice(0,5);
}

module.exports = {
    add,
    getBookmarks,
    updateTitle,
    deleteBookmark,
    getTopFiveBookmarks
}