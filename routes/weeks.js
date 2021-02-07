const router = require('express').Router();
const {Sign, Week} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {signName, title, description} = req.body;
    try {
        const sign = await Sign.findOne({where: {name: signName}})
        const week = await Week.create({signId: sign["id"], title, description});
        return res.json(week);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/', async (req, res, ignored) => {
    try {
        const weeks = await Week.findAll({where: {uuid}, include: 'signs'})
        return res.json(weeks);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const week = await Week.findOne({where: {uuid}, include: 'signs'})
        return res.json(week)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const week = await Week.findOne({where: {uuid}})
        await week.destroy()
        return res.json({message: 'Week deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {signName, title, description} = req.body;
    try {
        const week = await Week.findOne({where: {uuid}})
        if (signName) {
            const sign = await Sign.findOne({where: {name: signName}})
            week.signId = sign["id"];
        }
        if (title) {
            week.title = title;
        }
        if (description) {
            week.description = description;
        }
        await week.save()
        return res.json(week)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
