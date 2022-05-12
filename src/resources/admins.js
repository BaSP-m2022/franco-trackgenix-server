import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const adminToEdit = admins.find((adm) => adm.id === adminId);
  if (adminToEdit) {
    const adminBody = req.body;
    adminToEdit.firstName = adminBody.firstName ? adminBody.firstName : adminToEdit.firstName;
    adminToEdit.lastName = adminBody.lastName ? adminBody.lastName : adminToEdit.lastName;
    adminToEdit.email = adminBody.email ? adminBody.email : adminToEdit.email;
    adminToEdit.dateOfBirth = adminBody.dateOfBirth
      ? adminBody.dateOfBirth : adminToEdit.dateOfBirth;
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

router.get('/', (req, res) => {
  const adminFirstName = req.query.firstName;
  const adminLastName = req.query.lastName;
  if (!adminFirstName && !adminLastName) {
    res.send(admins);
  }
  const filteredAdmins = admins.filter((admin) => {
    if (adminFirstName && adminLastName) {
      return admin.firstName.toLowerCase().includes(adminFirstName.toLowerCase())
              && admin.lastName.toLowerCase().includes(adminLastName.toLowerCase());
    }
    if (adminFirstName) {
      return admin.firstName.toLowerCase().includes(adminFirstName.toLowerCase());
    }
    if (adminLastName) {
      return admin.lastName.toLowerCase().includes(adminLastName.toLowerCase());
    }
    return false;
  });

  if (filteredAdmins.length > 0) {
    res.send(filteredAdmins);
  } else {
    res.send('Admin not found');
  }
});

router.get('/:id', (req, res) => {
  const admId = req.params.id;
  const admin = admins.find((adm) => adm.id === admId);
  if (admin) {
    res.send(admin);
  } else {
    res.send('Admin not found');
  }
});

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => adminId !== admin.id);
  if (filteredAdmins.length === admins.length) {
    res.send('Could not delete admin because it was not found');
  } else {
    fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Admin deleted');
      }
    });
  }
});

export default router;
