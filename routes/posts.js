const router = require('express').Router();
const {Post, User} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {userUuid, body} = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({where: {uuid: userUuid}})
        const post = await Post.create({body, userId: user["id"]})
        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

router.get('/', async (req, res, ignored) => {
    try {
        const posts = await Post.findAll({include: 'users'})
        return res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const post = await Post.findOne({where: {uuid}, include: 'users'});
        return res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const post = await Post.findOne({where: {uuid}})
        await post.destroy()
        return res.json({message: 'Post deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {body} = req.body;
    try {
        const post = await Post.findOne({where: {uuid}})
        post.body = body;
        await post.save()
        return res.json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
