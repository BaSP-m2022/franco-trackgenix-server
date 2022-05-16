import express from 'express';
// import fs from 'fs';
import Admin from '../models/Admins';

// const admins = [];

const router = express.Router();

export const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    return res.status(200).json(allAdmins);
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred',
      success: false,
    });
  }
};

export const postCreateAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const adminSaved = await newAdmin.save();
    return res.status(201).json({
      msg: 'Admin created successfully',
      data: adminSaved,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      success: false,
    });
  }
};

export const putEditAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'No id input',
        success: false,
      });
    }
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'The Admin has not been found',
        success: false,
      });
    }
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred while finding Admin',
      success: false,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        msg: 'No id input',
        success: false,
      });
    }
    const { id } = req.params;
    const result = await Admin.findById(id);
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error finding the admin',
      success: false,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'No id input',
        success: false,
      });
    }
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Admin has not been found',
        success: false,
      });
    }
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred while deleting the specified admin',
      success: false,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find(req.query);
    return res.status(200).json({
      data: admins,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred',
      success: false,
    });
  }
};

// export const postCreateAdmin = (req, res) => {
//   const adminData = req.body;
//   if (adminData.id
//     && adminData.firstName
//     && adminData.lastName
//     && adminData.email
//     // && adminData.dateOfBirth
//     && adminData.password
//     && adminData.dni) {
//     admins.push(adminData);
//     // fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
//     //   if (err) {
//     //     res.send(err);
//     //   } else {
//     //     res.send('Admin created');
//     //   }
//     // });
//   } else {
//     res.send('Admin not created, missing data');
//   }
// };

// export const putEditAdmin = (req, res) => {
//   const adminId = req.params.id;
//   const adminToEdit = admins.find((adm) => adm.id === adminId);
//   if (adminToEdit) {
//     const adminBody = req.body;
//     adminToEdit.firstName = adminBody.firstName ? adminBody.firstName : adminToEdit.firstName;
//     adminToEdit.lastName = adminBody.lastName ? adminBody.lastName : adminToEdit.lastName;
//     adminToEdit.email = adminBody.email ? adminBody.email : adminToEdit.email;
//     adminToEdit.dateOfBirth = adminBody.dateOfBirth
//       ? adminBody.dateOfBirth : adminToEdit.dateOfBirth;
//     adminToEdit.password = adminBody.password ? adminBody.password : adminToEdit.password;
//     // fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
//     //   if (err) {
//     //     res.send(err);
//     //   } else {
//     //     res.send('Admin edited');
//     //   }
//     // });
//   } else {
//     res.send('Admin not found');
//   }
// };

// export const getAdmin = (req, res) => {
//   const adminFirstName = req.query.firstName;
//   const adminLastName = req.query.lastName;
//   if (!adminFirstName && !adminLastName) {
//     res.send(admins);
//   }
//   const filteredAdmins = admins.filter((admin) => {
//     if (adminFirstName && adminLastName) {
//       return admin.firstName.toLowerCase().includes(adminFirstName.toLowerCase())
//               && admin.lastName.toLowerCase().includes(adminLastName.toLowerCase());
//     }
//     if (adminFirstName) {
//       return admin.firstName.toLowerCase().includes(adminFirstName.toLowerCase());
//     }
//     if (adminLastName) {
//       return admin.lastName.toLowerCase().includes(adminLastName.toLowerCase());
//     }
//     return false;
//   });

//   if (filteredAdmins.length > 0) {
//     res.send(filteredAdmins);
//   } else {
//     res.send('Admin not found');
//   }
// };

// export const getAdminById = (req, res) => {
//   const admId = req.params.id;
//   const admin = admins.find((adm) => adm.id === admId);
//   if (admin) {
//     res.send(admin);
//   } else {
//     res.send('Admin not found');
//   }
// };

// export const deleteAdminById = (req, res) => {
//   const adminId = req.params.id;
//   const filteredAdmins = admins.filter((admin) => adminId !== admin.id);
//   if (filteredAdmins.length === admins.length) {
//     res.send('Could not delete admin because it was not found');
//   } else {
//     // fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins), (err) => {
//     //   if (err) {
//     //     res.send(err);
//     //   } else {
//     //     res.send('Admin deleted');
//     //   }
//     // });
//   }
// };

export default router;
