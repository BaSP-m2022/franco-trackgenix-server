import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/new', (req, res) => {
  const adminData = req.body;
  if (adminData.id
    && adminData.firstName
    && adminData.lastName
    && adminData.email
    && adminData.dateOfBirth
    && adminData.password
    && adminData.dni) {
    admins.push(adminData);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Admin created');
      }
    });
  } else {
    res.send('Admin not created, missing data');
  }
});

router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/getById/:id', (req, res) => {
  const admId = req.params.id;
  const admin = admins.find((adm) => adm.id === parseInt(admId, 10));
  if (admin) {
    res.send(admin);
  } else {
    res.send('Admin not found');
  }
});

export default router;
// module.exports = router;

// const getAdminById = (req, res) => {
//   res.send(admins);
// };

// const getAdminsByQuery = (req, res) => {
//   res.send(admins);
// };

// export default {
//   getAdminById,
//   getAdminsByQuery,
// };
