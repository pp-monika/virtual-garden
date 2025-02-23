const mongoose = require('mongoose');

const HerbSchema = new mongoose.Schema({
    id:{
        type: String
    },
    identifier:{
        type: String
    },
    stateProvince:{
        type: String
    },
    scientificName:{
        x: { type: String },
        y: { type: String },
    }
},{
        timestamps: true,
        collection: 'herb_dataset'
      });

module.exports = mongoose.model('Herb', HerbSchema);