'use strict';
const Dev = require('../models/Devs');
const parseArrayToString = require('../utils/parseStringToArray');

module.exports = {

  async index(req, res) {
  // filtrar por geolocalozação e por tecnologia
    const { latitude, longitude, techs} = req.query;

    const techsArray = parseArrayToString(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },

    });

    return res.json({ devs });
  },


};
