const{ Router } = require('express')
const router = Router();

const Route = require('../models/Route')

router.get('/', async (req, res) => {
    const routes = await Route.find(); //evento asyncrono, que guarda en una constante
    console.log(routes)
    res.json(routes);
});


router.post('/', async (req, res) => {
    const {tittleRoute, company, iframe, collectionKeyPoints} = req.body;
    const newRoute = new Route({tittleRoute, company, iframe, collectionKeyPoints});
    await newRoute.save();
    res.json({
        message:'route saved',
        
    });
});

router.delete('/:id', async (req, res) =>{

    await Route.findByIdAndDelete(req.params.id);

    res.json({message:'route deleted}'});
})


module.exports = router;