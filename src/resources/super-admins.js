const express = require('express');

const router = express.Router();
const superAdmin = require('../data/super-admins.json');

router.get('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const sAdmin = superAdmin.find((sAdmin) => sAdmin.id === sAdminId);
  if (sAdmin) {
    res.send(sAdmin);
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
      res.send(`SuperAdmin ${sAdminName} not found`);
    }
  } else if (sAdminLName) {
    const filteredAdByLName = superAdmin.filter((sAdmin) => sAdmin.lastName.includes(sAdminLName));
    if (filteredAdByLName) {
      res.send(filteredAdByLName);
    } else {
      res.send(`SuperAdmin ${sAdminLName} not found`);
    }
  } else if (sAdminEmail) {
    const filteredAdByEmail = superAdmin.filter((sAdmin) => sAdmin.email.includes(sAdminEmail));
    if (filteredAdByEmail) {
      res.send(filteredAdByEmail);
    } else {
      res.send(`SuperAdmin ${sAdminEmail} not found`);
    }
  } else if (sAdminDate) {
    const filteredAdByDate = superAdmin.filter((sAdmin) => sAdmin.dateOfBirth.includes(sAdminDate));
    if (filteredAdByDate) {
      res.send(filteredAdByDate);
    } else {
      res.send(`SuperAdmin ${sAdminDate} not found`);
    }
  } else if (sAdminDni) {
    const filteredAdByDni = superAdmin.filter((sAdmin) => sAdmin.dni.includes(sAdminDni));
    if (filteredAdByDni) {
      res.send(filteredAdByDni);
    } else {
      res.send(`SuperAdmin ${sAdminDni} not found`);
    }
  }
});

module.exports = router;
