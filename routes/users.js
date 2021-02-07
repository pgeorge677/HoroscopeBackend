const router = require('express').Router();
const {User} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {name, email, role} = req.body;
    try {
        const user = await User.create({name, email, role});
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/', async (req, res, ignored) => {
    try {
        const users = await User.findAll({include: 'posts'});
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({where: {uuid}, include: 'posts'})
        return res.json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({where: {uuid}})
        await user.destroy()
        return res.json({message: 'User deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {name, email, role} = req.body;
    try {
        const user = await User.findOne({where: {uuid}})
        user.name = name;
        user.email = email;
        user.role = role;
        await user.save()
        return res.json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
