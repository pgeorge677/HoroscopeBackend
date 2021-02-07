const router = require('express').Router();
const {
    Sign, Characteristic,
    Day, Week, Month, Year
} = require('../models')

router.post('/', async (req, res, ignored) => {
    const {name} = req.body;
    try {
        const sign = await Sign.create({name});
        return res.json(sign);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/', async (req, res, ignored) => {
    try {
        const signs = await Sign.findAll({
            include: [
                {
                    model: Characteristic,
                    as: 'characteristics',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Day,
                    as: 'days',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Week,
                    as: 'weeks',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Month,
                    as: 'months',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Year,
                    as: 'years',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                }]
        });
        return res.json(signs);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
});

router.get('/sign', async (req, res, ignored) => {
        const uuid = req.query.uuid;
        const name = req.query.name;
        try {
            let sign;
            const modelsIncluded = [
                {
                    model: Characteristic,
                    as: 'characteristics',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Day,
                    as: 'days',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Week,
                    as: 'weeks',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Month,
                    as: 'months',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: Year,
                    as: 'years',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                }]
            if (name) {
                sign = await Sign.findOne({
                    where: {name},
                    include: modelsIncluded
                });
            } else {
                sign = await Sign.findOne({
                    where: {uuid},
                    include: modelsIncluded
                });
            }
            return res.json(sign)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    }
);

router.get('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const sign = await Sign.findOne({where: {uuid}, include: 'characteristics'})
        return res.json(sign)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
});

router.delete('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    try {
        const sign = await Sign.findOne({where: {uuid}})
        await sign.destroy()
        return res.json({message: 'Sign deleted!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

router.put('/:uuid', async (req, res, ignored) => {
    const uuid = req.params.uuid;
    const {name} = req.body;
    try {
        const sign = await Sign.findOne({where: {uuid}})
        sign.name = name;
        await sign.save()
        return res.json(sign)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
});

module.exports = router;
