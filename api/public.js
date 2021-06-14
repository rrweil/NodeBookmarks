const router = require('express').Router();
const bookmarksDb = require('../db/bookmarks');

router.get('/topfive', async (req, res) => {
    const topFiveBookmarks = await bookmarksDb.getTopFiveBookmarks();
    res.json(topFiveBookmarks);
});

module.exports = router;