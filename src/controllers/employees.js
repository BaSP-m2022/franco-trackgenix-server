import Employee from '../models/Employees';

const post = async (req, res) => {
  try {
    const employee = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
    });
    await employee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating new employee',
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const findEmployee = await Employee.findByIdAndRemove(req.params.id);
    if (!findEmployee) {
      return res.status(404).json({
        message: 'Employee ID not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee deleted successfully',
      data: findEmployee,
      error: false,
    });
  } catch (error) {
    return res.json({
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
