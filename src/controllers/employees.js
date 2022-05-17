import Employee from '../models/Employees';

const post = async (req, res) => {
  try {
    const newEmployee = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
    });
    await newEmployee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating new employee',
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const findAndDeleteEmployee = await Employee.findByIdAndRemove(req.params.id);
    if (!findAndDeleteEmployee) {
      return res.status(404).json({
        message: 'Employee ID not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee deleted successfully',
      data: findAndDeleteEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(500)({
      message: 'Employee can not be deleted',
      data: undefined,
      error: true,
    });
  }
};

export default {
  post,
  deleteById,
};
