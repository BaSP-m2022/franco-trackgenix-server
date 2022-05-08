import express from 'express';

const router = express.Router();
const employees = require('../data/employees.json');

router.get('getAllEmployees', (req, res) => {
  res.send(employees);
});

router.get('/getById/:id', (req, res) => {
  const employeesId = req.params.id === 'true';
  const findEmployees = employees.find((employee) => employee.id === employeesId);
  if (findEmployees) {
    res.send(findEmployees);
  } else {
    res.send('This employee does not exist');
  }
});

export default router;
