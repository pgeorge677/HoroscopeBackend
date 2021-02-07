const router = require('express').Router();
const {Sign, Day} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {signName, title, description} = req.body;
    try {
        const sign = await Sign.findOne({where: {name: signName}})
        const day = await Day.create({signId: sign["id"], title, description});
        return res.json(day);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.post('/bulk', async (req, res, ignored) => {
    const {signs} = req.body;
    let json = {};
    json.signs = [];
    for (const currentSign of signs) {
        const {sign, horoscope} = currentSign;
        const {title, description} = horoscope;
        try {
            const signDb = await Sign.findOne({where: {name: sign}})
            const horoscope = await Day.create({signId: signDb["id"], title, description});
            json.signs.push({
                sign,
                horoscope
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
    return res.json(json);
});

router.get('/', async (req, res, ignored) => {
    try {
        const days = await Day.findAll({
                limit: 1,
                include: 'signs',
                order: [['createdAt', 'DESC']]
            }
        );
        return res.json(days);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const day = await Day.findOne({where: {uuid}, include: 'signs'})
        return res.json(day)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const day = await Day.findOne({where: {uuid}})
        await day.destroy()
        return res.json({message: 'Day deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {signName, title, description} = req.body;
    try {
        const day = await Day.findOne({where: {uuid}})
        if (signName) {
            const sign = await Sign.findOne({where: {name: signName}})
            day.signId = sign["id"];
        }
        if (title) {
            day.title = title;
        }
        if (description) {
            day.description = description;
        }
        await day.save()
        return res.json(day)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
