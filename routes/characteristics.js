const router = require('express').Router();
const {Sign, Characteristic} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {
        signName, symbolize, element,
        season, character, positive, negative,
        dayOfWeek, color, planet, perfume, description
    } = req.body;
    try {
        const sign = await Sign.findOne({where: {name: signName}})
        const characteristic = await Characteristic.create({
            signId: sign["id"], symbolize, element,
            season, character, positive,
            negative, dayOfWeek, color,
            planet, perfume, description
        });
        return res.json(characteristic);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/', async (req, res, ignored) => {
    try {
        const characteristics = await Characteristic.findAll({include: 'signs'});
        return res.json(characteristics);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const characteristic = await Characteristic.findOne({where: {uuid}, include: 'signs'})
        return res.json(characteristic)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const characteristic = await Characteristic.findOne({where: {uuid}})
        await characteristic.destroy()
        return res.json({message: 'Characteristic deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {
        signName, symbolize, element,
        season, character, positive, negative,
        dayOfWeek, color, planet, perfume, description
    } = req.body;
    try {
        const characteristic = await Characteristic.findOne({where: {uuid}})
        if (signName) {
            const sign = await Sign.findOne({where: {name: signName}})
            characteristic.signId = sign["id"];
        }
        if (symbolize) {
            characteristic.symbolize = symbolize;
        }
        if (element) {
            characteristic.element = element;
        }
        if (season) {
            characteristic.season = season;
        }
        if (character) {
            characteristic.character = character;
        }
        if (positive) {
            characteristic.positive = positive;
        }
        if (negative) {
            characteristic.negative = negative;
        }
        if (dayOfWeek) {
            characteristic.dayOfWeek = dayOfWeek;
        }
        if (color) {
            characteristic.color = color;
        }
        if (planet) {
            characteristic.planet = planet;
        }
        if (perfume) {
            characteristic.perfume = perfume;
        }
        if (description) {
            characteristic.description = description;
        }
        await characteristic.save()
        return res.json(characteristic)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
