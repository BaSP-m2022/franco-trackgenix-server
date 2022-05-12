import express from 'express';
import fs from 'fs';

const employees = require('../data/employees.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(employees);
});

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
        res.send('employee added');
      }
    });
  } else {
    res.send('employee not added');
  }
});

router.get('/', (req, res) => {
  const employeeId = req.query.id;
  const employeeName = req.query.firstName;
  const employeeLastName = req.query.lastName;
  const employeeEmail = req.query.email;
  const employeeDoB = req.query.dateOfBirth;
  const employeeDni = req.query.dni;
  if (!employeeId && !employeeName && !employeeLastName && !employeeEmail
    && !employeeDoB && !employeeDni) {
    res.send(employees);
  }
  const employeeFilter = employees.filter((employee) => {
    if (employeeId && employeeName && employeeLastName && employeeEmail
        && employeeDoB && employeeDni) {
      return employee.id.toLowerCase().includes(employeeId.toLowerCase())
        && employee.firstName.toLowerCase().includes(employeeName.toLowerCase())
        && employee.lastName.toLowerCase().includes(employeeLastName.toLowerCase())
        && employee.email.toLowerCase().includes(employeeEmail.toLowerCase())
        && employee.dateOfBirth.toLowerCase().includes(employeeDoB.toLowerCase())
        && employee.dni.toLowerCase().includes(employeeDni.toLowerCase());
    }
    if (employeeName && employeeLastName && employeeEmail && employeeDoB && employeeDni) {
      return employee.firstName.toLowerCase().includes(employeeName.toLowerCase())
        && employee.lastName.toLowerCase().includes(employeeLastName.toLowerCase())
        && employee.email.toLowerCase().includes(employeeEmail.toLowerCase())
        && employee.dateOfBirth.toLowerCase().includes(employeeDoB.toLowerCase())
        && employee.dni.toLowerCase().includes(employeeDni.toLowerCase());
    }
    if (employeeLastName && employeeEmail && employeeDoB && employeeDni) {
      return employee.lastName.toLowerCase().includes(employeeLastName.toLowerCase())
        && employee.email.toLowerCase().includes(employeeEmail.toLowerCase())
        && employee.dateOfBirth.toLowerCase().includes(employeeDoB.toLowerCase())
        && employee.dni.toLowerCase().includes(employeeDni.toLowerCase());
    }
    if (employeeEmail && employeeDoB && employeeDni) {
      return employee.email.toLowerCase().includes(employeeEmail.toLowerCase())
        && employee.dateOfBirth.toLowerCase().includes(employeeDoB.toLowerCase())
        && employee.dni.toLowerCase().includes(employeeDni.toLowerCase());
    }
    if (employeeDoB && employeeDni) {
      return employee.dateOfBirth.toLowerCase().includes(employeeDoB.toLowerCase())
        && employee.dni.toLowerCase().includes(employeeDni.toLowerCase());
    }
    if (employeeDni) {
      return employee.dni.toLowerCase().includes(employeeDni.toLowerCase());
    }
    if (employeeDoB) {
      return employee.dateOfBirth.toLowerCase().includes(employeeDoB.toLowerCase());
    }
    if (employeeEmail) {
      return employee.email.toLowerCase().includes(employeeEmail.toLowerCase());
    }
    if (employeeLastName) {
      return employee.lastName.toLowerCase().includes(employeeLastName.toLowerCase());
    }
    if (employeeName) {
      return employee.firstName.toLowerCase().includes(employeeName.toLowerCase());
    }
    if (employeeId) {
      return employee.id.toLowerCase().includes(employeeId.toLowerCase());
    }
    return false;
  });
  if (employeeFilter.length > 0) {
    res.send(employeeFilter);
  } else {
    res.send('Employee not found');
  }
});

export default router;
