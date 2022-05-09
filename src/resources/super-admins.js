const express = require('express');
const fs = require('fs');

const router = express.Router();
const superAdmin = require('../data/super-admins.json');

router.get('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const sAdmin = superAdmin.find((s) => s.id === sAdminId);
  if (sAdmin) {
    res.send(sAdmin);
  } else {
    res.send('SuperAdmin not found');
  }
});

router.get('/', (req, res) => {
  const sAdminName = req.query.firstName;
  const sAdminLName = req.query.lastName;
  //   const sAdminEmail = req.query.email;
  //   const sAdminDate = req.query.dateOfBirth;
  //   const sAdminDni = req.query.dni;
  if (!sAdminName && !sAdminLName) {
    res.send(superAdmin);
  }
  const filteredAdByName = superAdmin.filter((sAdmin) => {
    if (sAdminName && sAdminLName) {
      return sAdmin.firstName.includes(sAdminName) && sAdmin.lastName.includes(sAdminLName);
    }
    if (sAdminName) {
      return sAdmin.firstName.includes(sAdminName);
    }
    return false;
  });
  if (filteredAdByName.length > 0) {
    res.send(filteredAdByName);
  } else {
    res.send('SuperAdmin not found');
  }
});

router.post('/', (req, res) => {
  const sAdmin = req.body;
  if (sAdmin.id && sAdmin.firstName && sAdmin.lastName && sAdmin.email && sAdmin.dateOfBirth
      && sAdmin.dni) {
    superAdmin.push(sAdmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmin), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('SuperAdmin Created');
      }
    });
  } else {
    res.send('Data insufficient');
  }
});

router.delete('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const deletedById = superAdmin.filter((s) => s.id !== sAdminId);
  if (superAdmin.length === deletedById.length) {
    res.send('Could not delete SuperAdmin because it was not found');
  } else {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(deletedById), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('SuperAdmin Deleted');
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const sAdmin = superAdmin.find((s) => s.id === sAdminId);
  if (sAdmin) {
    const sAdminUpdated = req.body;
    const newAdmin = {};
    newAdmin.firstName = sAdminUpdated.firstName ? sAdminUpdated.firstName : sAdmin.firstName;
    newAdmin.lastName = sAdminUpdated.lastName ? sAdminUpdated.lastName : sAdmin.lastName;
    newAdmin.email = sAdminUpdated.email ? sAdminUpdated.email : sAdmin.email;
    newAdmin.dateOfBirth = sAdminUpdated.dateOfBirth
      ? sAdminUpdated.dateOfBirth : sAdmin.dateOfBirth;
    newAdmin.dni = sAdminUpdated.dni ? sAdminUpdated.dni : sAdmin.dni;
    res.send({ msg: 'SuperAdmin updated', newAdmin });
  } else {
    res.send('SuperAdmin not found');
  }
});

module.exports = router;
