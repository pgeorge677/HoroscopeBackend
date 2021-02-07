const router = require('express').Router();
const {Sign, Month} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {signName, title, description, love, work, heal} = req.body;
    try {
        const sign = await Sign.findOne({where: {name: signName}})
        const month = await Month.create({signId: sign["id"], title, description, love, work, heal});
        return res.json(month);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/', async (req, res, ignored) => {
    try {
        const months = await Month.findAll({include: 'signs'});
        return res.json(months);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const month = await Month.findOne({where: {uuid}, include: 'signs'})
        return res.json(month)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const month = await Month.findOne({where: {uuid}})
        await month.destroy()
        return res.json({message: 'Month deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {signName, title, description, love, work, heal} = req.body;
    try {
        const month = await Month.findOne({where: {uuid}})
        if (signName) {
            const sign = await Sign.findOne({where: {name: signName}})
            month.signId = sign["id"];
        }
        if (title) {
            month.title = title;
        }
        if (description) {
            month.description = description;
        }
        if (love) {
            month.description = description;
        }
        if (work) {
            month.description = description;
        }
        if (heal) {
            month.description = description;
        }
        await month.save()
        return res.json(month)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
