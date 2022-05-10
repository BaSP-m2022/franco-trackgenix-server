import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/create', (req, res) => {
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

router.put('/edit/:id', (req, res) => {
  const adminId = req.params.id;
  const adminToEdit = admins.find((adm) => adm.id === adminId);
  if (adminToEdit) {
    const adminBody = req.body;
    adminToEdit.firstName = adminBody.firstName ? adminBody.firstName : adminToEdit.firstName;
    adminToEdit.lastName = adminBody.lastName ? adminBody.lastName : adminToEdit.lastName;
    adminToEdit.email = adminBody.email ? adminBody.email : adminToEdit.email;
    // eslint-disable-next-line max-len
    adminToEdit.dateOfBirth = adminBody.dateOfBirth ? adminBody.dateOfBirth : adminToEdit.dateOfBirth;
    adminToEdit.password = adminBody.password ? adminBody.password : adminToEdit.password;
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Admin edited');
      }
    });
  } else {
    res.send('Admin not found');
  }
});
router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/getById/:id', (req, res) => {
  const admId = req.params.id;
  const admin = admins.find((adm) => adm.id === admId);
  if (admin) {
    res.send(admin);
  } else {
    res.send('Admin not found');
  }
});

export default router;
