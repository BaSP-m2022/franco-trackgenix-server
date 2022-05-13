import express from 'express';
import fs from 'fs';

const employees = require('../data/employees.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((s) => s.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('Employee not found');
  }
});

router.delete('/:id', (req, res) => {
  const employeeId = req.params.id;
  const deleteEmployee = employees.filter((s) => s.id !== employeeId);
  if (employees.length === deleteEmployee.length) {
    res.send('Employee was not found to delete');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(deleteEmployee), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('Employee deleted');
      }
    });
  }
});

router.post('/', (req, res) => {
  const employeeAdd = req.body;
  if (employeeAdd.id && employeeAdd.firstName && employeeAdd.lastName
    && employeeAdd.email && employeeAdd.dateOfBirth && employeeAdd.dni) {
    employees.push(employeeAdd);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('New employee created');
      }
    });
  } else {
    res.send('Insufficient data: New employee impossible to create.');
  }
});

router.put('/:id', (req, res) => {
  const reqId = req.params.id;
  const modEmployee = employees.find((employee) => employee.id === reqId);
  if (modEmployee) {
    const empUpdate = req.body;
    const updated = {};
    updated.id = reqId;
    updated.firstName = empUpdate.firstName ? empUpdate.firstName : modEmployee.firstName;
    updated.lastName = empUpdate.lastName ? empUpdate.lastName : modEmployee.lastName;
    updated.dni = empUpdate.dni ? empUpdate.dni : modEmployee.dni;
    updated.dateOfBirth = empUpdate.dateOfBirth ? empUpdate.dateOfBirth : modEmployee.dateOfBirth;
    updated.password = empUpdate.password ? empUpdate.password : modEmployee.password;
    updated.email = empUpdate.email ? empUpdate.email : modEmployee.email;
    const toEdit = employees.filter((employee) => employee.id !== reqId);
    toEdit.push(updated);
    fs.writeFile('src/data/employees.json', JSON.stringify(toEdit), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Employee ${updated.firstName} ${updated.lastName} successfully updated`);
      }
    });
  } else {
    res.send('Error: Id not found.');
  }
});

export default router;
