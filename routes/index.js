const router = require('express').Router()
usersRouter = require('./users')
postsRouter = require('./posts')
signsRouter = require('./signs')
characteristicsRouter = require('./characteristics')
daysRouter = require('./days')
weekRouter = require('./weeks')
monthRouter = require('./months')
yearRouter = require('./years');

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/signs', signsRouter);
router.use('/characteristics', characteristicsRouter);
router.use('/days', daysRouter);
router.use('/weeks', weekRouter);
router.use('/months', monthRouter);
router.use('/years', yearRouter);

module.exports = router;
