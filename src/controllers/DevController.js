'use strict';
const axios = require('axios');
const Dev = require('../models/Devs');
const parseArrayToString = require('../utils/parseStringToArray');


module.exports = {
  // controller = index, show, store, update, destroy
  // buscar todos
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },
  // inserir
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios
        .get(`http://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio, login } = response.data;
      const techArray = parseArrayToString(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techArray,
        location,
      });

    }
    return res.json(dev);
  },
  // alterar(update)
  async update(req, res) {
    const { github_username, latitude, longitude, techs} = req.body;

    let oneDev = await Dev.findOne({ github_username });

    try {
      if (!oneDev) {
        return res.json({ message: 'Usuário não encontrado' });
      } else {
        const response = await axios
          .get(`http://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio, login } = response.data;

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        const techsArray = parseArrayToString(techs);

        const dev = await Dev.findOneAndUpdate(
          { github_username: github_username },
          {
            name,
            bio,
            avatar_url,
            techs: techsArray,
            location,
          },
          { new: true },
        );
        return res.json(dev);
      }

    } catch (err) {
      return res.json(err);
    }
  },
  // deletar
  async destroy(req, res) {
    const { github_username } = req.query;

    const toDelete = await Dev.findOneAndDelete({ github_username });

    res.json({ toDelete });

  },

};
