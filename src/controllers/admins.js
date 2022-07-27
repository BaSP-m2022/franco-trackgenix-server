import Firebase from '../helper/firebase';
import Admin from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ ...req.query, isDeleted: false });
    if (admins.length) {
      return res.status(200).json({
        message: 'Showing admins.',
        data: admins,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Cannot show the list of admins.',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await Admin.findById(req.params.id).find({ isDeleted: false });
      if (!admin.length) {
        return res.status(404).json({
          message: `Could not found an admin by the id of ${req.params.id}.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Showing the specified admin by the id of ${req.params.id}.`,
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'No input available.',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  let newFirebaseUser;
  try {
    newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
  } catch (error) {
    return res.status(500).json({
      message: `Firebase Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
  const bodyAdmin = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    firebaseUid: newFirebaseUser.uid,
    isDeleted: false,
  };
  try {
    const newAdmin = await Admin.create(bodyAdmin);
    return res.status(201).json({
      message: 'Your registration was successful',
      data: newAdmin,
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

const editAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin updated',
      data: result,
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

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndUpdate(req.params.id, { isDeleted: true });
    await Firebase.auth().deleteUser(result.firebaseUid).catch(() => { throw new Error('Firebase error'); });
    if (result) {
      return res.status(200).json({
        message: `Admin by the id of ${req.params.id} deleted successfully.`,
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `No admin with the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};
