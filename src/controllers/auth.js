import Firebase from '../helper/firebase';
import Employee from '../models/Employees';
import Admin from '../models/Admins';
import SuperAdmin from '../models/Super-admins';

const signUp = async (req, res) => {
  let newFirebaseUser;
  try {
    newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    })
      .catch((error) => res.status(500).json({
        message: error.message,
        data: undefined,
        error: true,
      }));

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: req.body.role });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    firebaseUid: newFirebaseUser.uid,
  };
  if (req.body.role === 'EMPLOYEE') {
    const bodyEmployee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      firebaseUid: newFirebaseUser.uid,
    };
    try {
      const newEmployee = await Employee.create(bodyEmployee);
      return res.status(201).json({
        message: 'Your registration was successful',
        data: newEmployee,
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  }

  if (req.body.role === 'ADMIN') {
    try {
      const newEmployee = await Admin.create(body);
      return res.status(201).json({
        message: 'Admin created successfully',
        data: newEmployee,
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  }

  if (req.body.role === 'SUPERADMIN') {
    try {
      const newEmployee = await SuperAdmin.create(body);
      return res.status(201).json({
        message: 'Super Admin created successfully',
        data: newEmployee,
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  }

  return res.status(500).json({
    message: 'Some fields are missing',
    data: undefined,
    error: true,
  });
};

export default { signUp };
