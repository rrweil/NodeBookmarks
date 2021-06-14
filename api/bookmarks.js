const router = require('express').Router();
const bookmarksDb = require('../db/bookmarks');

router.get('/add', (req, res) => {
    res.render('bookmarks/add');
});

router.post('/add', async (req, res) => {
    await bookmarksDb.add(req.body, req.user);
    res.redirect('/');
});

router.get('/getmybookmarks', async (req, res) => {
    const bookmarks = await bookmarksDb.getBookmarks(req.user.id);
    res.json(bookmarks);
});

router.post('/updatetitle', async (req, res) => {
    await bookmarksDb.updateTitle(req.body);
    res.redirect('/');
});

router.post('/delete', async (req, res) => {
    await bookmarksDb.deleteBookmark(req.body);
    res.redirect('/');
});

module.exports = router;