const Post = require('../models/Post');

module.exports = {
  // Cadastrar um like
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    console.log(post)
    req.io.emit('like', post);

    return res.json(post);
  },
};
