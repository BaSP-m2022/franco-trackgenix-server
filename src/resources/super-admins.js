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

router.post('/add', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
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
    sAdmin.firstName = sAdminUpdated.firstName ? sAdminUpdated.firstName : sAdmin.firstName;
    sAdmin.lastName = sAdminUpdated.lastName ? sAdminUpdated.lastName : sAdmin.lastName;
    sAdmin.email = sAdminUpdated.email ? sAdminUpdated.email : sAdmin.email;
    sAdmin.dateOfBirth = sAdminUpdated.dateOfBirth ? sAdminUpdated.dateOfBirth : sAdmin.dateOfBirth;
    sAdmin.dni = sAdminUpdated.dni ? sAdminUpdated.dni : sAdmin.dni;
    res.send({ msg: 'SuperAdmin updated', sAdmin });
  } else {
    res.send('SuperAdmin not found');
  }
});
router.get('/', (req, res) => {
  const sAdminName = req.query.firstName;
  const sAdminLName = req.query.lastName;
  const sAdminEmail = req.query.email;
  const sAdminDate = req.query.dateOfBirth;
  const sAdminDni = req.query.dni;
  if (!sAdminName && !sAdminLName && !sAdminEmail && !sAdminDate && !sAdminDni) {
    res.send(superAdmin);
  } else if (sAdminName) {
    const filteredAdByName = superAdmin.filter((sAdmin) => sAdmin.firstName.includes(sAdminName));
    if (filteredAdByName.length > 0) {
      res.send(filteredAdByName);
    } else {
      res.send(`SuperAdmin whit Name: ${sAdminName}, not found`);
    }
  } else if (sAdminLName) {
    const filteredAdByLName = superAdmin.filter((sAdmin) => sAdmin.lastName.includes(sAdminLName));
    if (filteredAdByLName.length > 0) {
      res.send(filteredAdByLName);
    } else {
      res.send(`SuperAdmin whit Last Name: ${sAdminLName}, not found`);
    }
  } else if (sAdminEmail) {
    const filteredAdByEmail = superAdmin.filter((sAdmin) => sAdmin.email.includes(sAdminEmail));
    if (filteredAdByEmail.length > 0) {
      res.send(filteredAdByEmail);
    } else {
      res.send(`SuperAdmin whit email: ${sAdminEmail}, not found`);
    }
  } else if (sAdminDate) {
    const filteredAdByDate = superAdmin.filter((sAdmin) => sAdmin.dateOfBirth.includes(sAdminDate));
    if (filteredAdByDate.length > 0) {
      res.send(filteredAdByDate);
    } else {
      res.send(`SuperAdmin whit date of birth: ${sAdminDate}, not found`);
    }
  } else if (sAdminDni) {
    const filteredAdByDni = superAdmin.filter((sAdmin) => sAdmin.dni.includes(sAdminDni));
    if (filteredAdByDni.length > 0) {
      res.send(filteredAdByDni);
    } else {
      res.send(`SuperAdmin whit dni: ${sAdminDni}, not found`);
    }
  }
});

module.exports = router;
