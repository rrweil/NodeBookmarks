const router = require('express').Router();
const account = require('./account');
const bookmarks = require('./bookmarks');
const public = require('./public');
const { ensureAuthenticated } = require('../auth');

router.use('/account', account);
router.use('/bookmarks', ensureAuthenticated, bookmarks);
router.use('/public', public);


module.exports = router;