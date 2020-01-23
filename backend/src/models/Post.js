const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes:{
        type: Number,
        default: 0,
    },
},{
    //cria campos que armazenam as datas de criação e a data da ultima alteração no BD
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);