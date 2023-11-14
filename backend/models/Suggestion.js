const {Schema, model} = require('mongoose');

const SuggestionSchema = new Schema({
    nameUser:{ type: String, required:true},
    emailUser:{ type: String, required:true},
    caseUser: {type: String, required:true},
    messageUser: { type: String, required: true },
    created_at: { type: Date, default: Date.now},
},{
    collection: 'suggestions',
});

module.exports = model('Suggestion',SuggestionSchema);