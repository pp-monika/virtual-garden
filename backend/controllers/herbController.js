const Herb = require('../models/Herb');

exports.getHerbs = async (req, res) =>{
    try{
        const herbs = await Herb.find();
        res.json(herbs);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};