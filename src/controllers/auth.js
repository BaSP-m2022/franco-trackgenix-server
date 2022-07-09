import Firebase from '../helper/firebase';
import Employee from '../models/Employees';

const signUp = async (req, res) => {
  let newFirebaseUser;
  try {
    newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });
  } catch (error) {
    return res.status(500).json({
      message: `Firebase Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
  const bodyEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dni: req.body.dni,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    firebaseUid: newFirebaseUser.uid,
    isDeleted: false,
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
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

export default { signUp };
