const {Schema, model} = require('mongoose');

const RouteSchema = new Schema({
    tittleRoute:{ type: String, required:true},
    company:{ type: String, required:true},
    iframe: {type: String, required:true},
    collectionKeyPoints:{ type: Array, required: true },
    // imagePath: { type: String, required: true},
    created_at: { type: Date, default: Date.now},
},{
    collection: 'routes',
});

module.exports = model('Route',RouteSchema);