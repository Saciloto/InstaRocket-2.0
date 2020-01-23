const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  // LISTAR
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt'); // ordenação pelos mais recentes com o -

    return res.json(posts);
  },
  // Cadastrar
  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    const { filename: image } = req.file;
    console.log(req.body);
    // vai separar s string da imagem, o nome antes do . e a extenção após o .
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // função que altera o tamanho da imagem para dimunuir o tamanho
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );
    // função que apaga a imagem original
    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post);
    console.log(post);
    return res.json(post);
  },
};
