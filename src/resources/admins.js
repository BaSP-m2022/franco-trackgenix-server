// use "require" to import JSON files
const admins = require('../data/admins.json');

const getAdminById = (req, res) => {
  res.send(admins);
};

const getAdminsByQuery = (req, res) => {
  res.send(admins);
};

export default {
  getAdminById,
  getAdminsByQuery,
};
