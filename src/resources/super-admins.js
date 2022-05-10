import express from 'express';
import fs from 'fs';

const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const sAdmin = superAdmins.find((s) => s.id === sAdminId);
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
    res.send(superAdmins);
  }
  const filteredSuperAdmins = superAdmins.filter((sAdmin) => {
    if (sAdminName && sAdminLName && sAdminEmail && sAdminDate && sAdminDni) {
      return sAdmin.firstName.includes(sAdminName.toLowerCase())
      && sAdmin.lastName.includes(sAdminLName.toLowerCase())
      && sAdmin.email.includes(sAdminEmail.toLowerCase())
      && sAdmin.dateOfBirth.includes(sAdminDate.toLowerCase())
      && sAdmin.dni.includes(sAdminDni.toLowerCase());
    }
    if (sAdminName && sAdminLName && sAdminEmail && sAdminDate) {
      return sAdmin.firstName.includes(sAdminName.toLowerCase())
      && sAdmin.lastName.includes(sAdminLName.toLowerCase())
      && sAdmin.email.includes(sAdminEmail.toLowerCase())
      && sAdmin.dateOfBirth.includes(sAdminDate.toLowerCase());
    }
    if (sAdminName && sAdminLName && sAdminEmail) {
      return sAdmin.firstName.includes(sAdminName.toLowerCase())
      && sAdmin.lastName.includes(sAdminLName.toLowerCase())
      && sAdmin.email.includes(sAdminEmail.toLowerCase());
    }
    if (sAdminName && sAdminLName) {
      return sAdmin.firstName.includes(sAdminName.toLowerCase())
      && sAdmin.lastName.includes(sAdminLName.toLowerCase());
    }
    if (sAdminName) {
      return sAdmin.firstName.includes(sAdminName.toLowerCase());
    }
    if (sAdminLName) {
      return sAdmin.lastName.includes(sAdminLName.toLowerCase());
    }
    if (sAdminEmail) {
      return sAdmin.email.includes(sAdminEmail.toLowerCase());
    }
    if (sAdminDate) {
      return sAdmin.dateOfBirth.includes(sAdminDate.toLowerCase());
    }
    if (sAdminDni) {
      return sAdmin.dni.includes(sAdminDni.toLowerCase());
    }
    return false;
  });
  if (filteredSuperAdmins.length > 0) {
    res.send(filteredSuperAdmins);
  } else {
    res.send('SuperAdmin not found');
  }
});

router.post('/', (req, res) => {
  const sAdmin = req.body;
  if (sAdmin.id && sAdmin.firstName && sAdmin.lastName && sAdmin.email && sAdmin.dateOfBirth
      && sAdmin.dni) {
    superAdmins.push(sAdmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
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
  const deletedById = superAdmins.filter((s) => s.id !== sAdminId);
  if (superAdmins.length === deletedById.length) {
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
  const sAdmin = superAdmins.find((s) => s.id === sAdminId);
  if (sAdmin) {
    const sAdminUpdated = req.body;
    const newAdmin = {};
    newAdmin.id = sAdminId;
    newAdmin.firstName = sAdminUpdated.firstName ? sAdminUpdated.firstName : sAdmin.firstName;
    newAdmin.lastName = sAdminUpdated.lastName ? sAdminUpdated.lastName : sAdmin.lastName;
    newAdmin.email = sAdminUpdated.email ? sAdminUpdated.email : sAdmin.email;
    newAdmin.dateOfBirth = sAdminUpdated.dateOfBirth
      ? sAdminUpdated.dateOfBirth : sAdmin.dateOfBirth;
    newAdmin.dni = sAdminUpdated.dni ? sAdminUpdated.dni : sAdmin.dni;
    const superAdminUpdate = superAdmins.filter((s) => s.id !== sAdminId);
    superAdminUpdate.push(newAdmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdminUpdate), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('SuperAdmin Updated');
      }
    });
  } else {
    res.send('SuperAdmin not found');
  }
});

export default router;
