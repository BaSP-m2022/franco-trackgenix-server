import SuperAdmins from '../models/Super-admins';

const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'missing id',
        data: req.params.id,
        error: true,
      });
    }
    const result = await SuperAdmins.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        message: 'Project deleted successfully',
        data: req.params.id,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Project not found',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const sAdmin = await SuperAdmins.findById(req.params.id);
      return res.status(200).json({
        sAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'id missing',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

const post = async (req, res) => {
  try {
    const sAdmin = new SuperAdmins({
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const result = await sAdmin.save();
    return res.status(201).json({
      result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

const put = async (req, res) => {
  try {
    if (req.params) {
      const result = await SuperAdmins.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (result) {
        return res.status(200).json({
          result,
          error: false,
        });
      }
      return res.status(404).json({
        message: 'Super Admin not found',
        data: req.params.id,
        error: true,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

const getFilter = async (req, res) => {
  try {
    const result = await SuperAdmins.find(req.query);
    if (result.length > 0) {
      res.status(200).json({
        result,
        error: false,
      });
    } else {
      res.status(404).json({
        message: 'Super Admins not found',
        data: undefined,
        error: true,
      });
    }

    // if (!sAdminName && !sAdminLName && !sAdminEmail) {
    //        if (result) {
    //     return res.status(200).json({
    //       result,
    //       error: false,
    //     });
    //   }
    //   return res.status(404).json({
    //     message: 'Super Admins not found',
    //     data: undefined,
    //     error: true,
    //   });
    // }
    // if (sAdminLName && sAdminName) {
    //   const result = await SuperAdmins.find({
    //     lastName: sAdminLName,
    //     firstName: sAdminName,
    //   });
    //   if (result != null) {
    //     return res.status(200).json({
    //       result,
    //       data: [sAdminName, sAdminLName],
    //       error: false,
    //     });
    //   }
    //   return res.status(404).json({
    //     message: 'Super Admins not found',
    //     data: [sAdminName, sAdminLName],
    //     error: true,
    //   });
    // }
    // if (sAdminName) {
    //   const result = await SuperAdmins.find({ firstName: sAdminName });
    //   if (result !== {}) {
    //     return res.status(200).json({
    //       result,
    //       error: false,
    //     });
    //   }
    //   return res.status(404).json({
    //     message: 'Super Admins not found',
    //     data: sAdminName,
    //     error: true,
    //   });
    // }
    // if (sAdminLName) {
    //   const result = await SuperAdmins.find({ lastName: sAdminLName });
    //   if (result !== null) {
    //     return res.status(200).json({
    //       result,
    //       error: false,
    //     });
    //   }
    //   return res.status(404).json({
    //     message: 'Super Admins not found',
    //     data: sAdminLName,
    //     error: true,
    //   });
    // }
    // if (sAdminEmail) {
    //   const result = await SuperAdmins.find({ email: sAdminEmail });
    //   if (result != null) {
    //     return res.status(200).json({
    //       result,
    //       error: false,
    //     });
    //   }
    //   return res.status(404).json({
    //     message: 'Super Admins not found',
    //     data: sAdminEmail,
    //     error: true,
    //   });
    // }
  } catch (error) {
    res.json({
      message: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

export default {
  getById,
  getFilter,
  deleteById,
  post,
  put,
};
