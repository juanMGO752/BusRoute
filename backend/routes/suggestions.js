const{ Router } = require('express')
const router = Router();

const Suggestion = require('../models/Suggestion')

router.get('/', async (req, res) => {
    const suggestions = await Suggestion.find(); //evento asyncrono, que guarda en una constante
    res.json(suggestions);
});


router.post('/', async (req, res) => {
    const {nameUser, emailUser, caseUser, messageUser} = req.body;
    const newSuggestion = new Suggestion({nameUser, emailUser, caseUser, messageUser});
    await newSuggestion.save();
    res.json({
        message:'suggestion saved',
        
    });
});

router.delete('/:id', async (req, res) =>{

    await Suggestion.findByIdAndDelete(req.params.id);

    res.json({message:'Suggestion deleted'});
})


module.exports = router;