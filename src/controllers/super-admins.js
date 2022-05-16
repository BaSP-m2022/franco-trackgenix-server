import SuperAdmins from '../models/Super-admins';
// import express from 'express';
// import fs from 'fs';
// const superAdmins = [];

// const getById = ('/:id', (req, res) => {
//   const sAdminId = req.params.id;
//   const sAdmin = superAdmins.find((s) => s.id === sAdminId);
//   if (sAdmin) {
//     res.send(sAdmin);
//   } else {
//     res.send('SuperAdmin not found');
//   }
// });

// const getFilter = ((req, res) => {
//   const sAdminName = req.query.firstName;
//   const sAdminLName = req.query.lastName;
//   const sAdminEmail = req.query.email;
//   const sAdminPassword = req.query.password;
//   if (!sAdminName && !sAdminLName && !sAdminEmail && sAdminPassword) {
//     res.send(superAdmins);
//   }
//   const filteredSuperAdmins = superAdmins.filter((sAdmin) => {
//     if (sAdminName && sAdminLName && sAdminEmail && sAdminPassword) {
//       return sAdmin.firstName.includes(sAdminName.toLowerCase())
//       && sAdmin.lastName.includes(sAdminLName.toLowerCase())
//       && sAdmin.email.includes(sAdminEmail.toLowerCase())
//       && sAdmin.password.includes(sAdminPassword.toLowerCase())
//     }
//     if (sAdminName && sAdminLName && sAdminEmail &&) {
//       return sAdmin.firstName.includes(sAdminName.toLowerCase())
//       && sAdmin.lastName.includes(sAdminLName.toLowerCase())
//       && sAdmin.email.includes(sAdminEmail.toLowerCase())
//     }
//     if (sAdminName && sAdminLName && sAdminEmail) {
//       return sAdmin.firstName.includes(sAdminName.toLowerCase())
//       && sAdmin.lastName.includes(sAdminLName.toLowerCase())
//       && sAdmin.email.includes(sAdminEmail.toLowerCase());
//     }
//     if (sAdminName && sAdminLName) {
//       return sAdmin.firstName.includes(sAdminName.toLowerCase())
//       && sAdmin.lastName.includes(sAdminLName.toLowerCase());
//     }
//     if (sAdminName) {
//       return sAdmin.firstName.includes(sAdminName.toLowerCase());
//     }
//     if (sAdminLName) {
//       return sAdmin.lastName.includes(sAdminLName.toLowerCase());
//     }
//     if (sAdminEmail) {
//       return sAdmin.email.includes(sAdminEmail.toLowerCase());
//     }
//     if (sAdminPassword) {
//       return sAdmin.password.includes(sAdminPassword.toLowerCase());
//     }
//     return false;
//   });
//   if (filteredSuperAdmins.length > 0) {
//     res.send(filteredSuperAdmins);
//   } else {
//     res.send('SuperAdmin not found');
//   }
// });

const post = async (req, res) => {
  try {
    const sAdmin = new SuperAdmins({
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const result = await sAdmin.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'Error',
      error: error.details[0].message,
    });
  }
};
  // if (sAdmin.firstName && sAdmin.lastName && sAdmin.email && sAdmin.password) {
  //   superAdmins.push(sAdmin);
// fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
//   if (err) {
//     res.send(err);
//   } else {
//     res.send('SuperAdmin Created');
//   }
// });
//   } else {
//     res.send('Data insufficient');
//   }
// });

// const deleteById = ('/:id', (req, res) => {
//   const sAdminId = req.params.id;
//   const deletedById = superAdmins.filter((s) => s.id !== sAdminId);
//   if (superAdmins.length === deletedById.length) {
//     res.send('Could not delete SuperAdmin because it was not found');
//   } else {
//     // fs.writeFile('src/data/super-admins.json', JSON.stringify(deletedById), (err) => {
//     //   if (err) {
//     //     res.send(err);
//     //   } else {
//     //     res.send('SuperAdmin Deleted');
//     //   }
//     // });
//   }
// });

// const put = ('/:id', (req, res) => {
//   const sAdminId = req.params.id;
//   const sAdmin = superAdmins.find((s) => s.id === sAdminId);
//   if (sAdmin) {
//     const sAdminUpdated = req.body;
//     const newAdmin = {};
//     newAdmin.id = sAdminId;
//     newAdmin.firstName = sAdminUpdated.firstName ? sAdminUpdated.firstName : sAdmin.firstName;
//     newAdmin.lastName = sAdminUpdated.lastName ? sAdminUpdated.lastName : sAdmin.lastName;
//     newAdmin.email = sAdminUpdated.email ? sAdminUpdated.email : sAdmin.email;
//     newAdmin.password = sAdminUpdated.password ? sAdminUpdated.password : sAdmin.password;
//     const superAdminUpdate = superAdmins.filter((s) => s.id !== sAdminId);
//     superAdminUpdate.push(newAdmin);
//     // fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdminUpdate), (err) => {
//     //   if (err) {
//     //     res.send(err);
//     //   } else {
//     //     res.send('SuperAdmin Updated');
//     //   }
//     // });
//   } else {
//     res.send('SuperAdmin not found');
//   }
// });

export default {
  // getById,
  // getFilter,
  // deleteById,
  post,
  // put,
};
