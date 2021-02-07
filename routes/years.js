const router = require('express').Router();
const {Sign, Year} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {signName, title, description} = req.body;
    try {
        const sign = await Sign.findOne({where: {name: signName}})
        const year = await Year.create({signId: sign["id"], title, description});
        return res.json(year);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.post('/bulk', async (req, res, ignored) => {
    const {signs} = req.body;
    let json = {};
    json.signs = [];
    console.log(signs);
    for (const currentSign of signs) {
        const {sign, horoscope} = currentSign;
        const {title, description} = horoscope;
        try {
            const signDb = await Sign.findOne({where: {name: sign}})
            const horoscope = await Year.create({signId: signDb["id"], title, description});
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
        const years = await Year.findAll({include: 'signs'});
        return res.json(years);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const year = await Year.findOne({where: {uuid}, include: 'signs'})
        return res.json(year)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const year = await Year.findOne({where: {uuid}})
        await year.destroy()
        return res.json({message: 'Year deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {signName, title, description} = req.body;
    try {
        const year = await Year.findOne({where: {uuid}})
        if (signName) {
            const sign = await Sign.findOne({where: {name: signName}})
            year.signId = sign["id"];
        }
        if (title) {
            year.title = title;
        }
        if (description) {
            year.description = description;
        }
        await year.save()
        return res.json(year)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
