import React, { useState, useEffect } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom';
const ListEmployeeComponent = () => {

//   const dummyData = [
//     {
//         "id" : 1,
//         "firstName" : "Ramesh",
//         "lastName" : "Kumar",
//         "email" : "ramesh@gmail.com"
//     },
//     {
//         "id" : 2,
//         "firstName" : "Karan",
//         "lastName" : "Sharma",
//         "email" : "karan@gmail.com"
//     },
//     {
//         "id" : 3,
//         "firstName" : "Amrit",
//         "lastName" : "Sohi",
//         "email" : "amit123@gmail.com"
//     }
//   ]   

  const [employees, setEmployees] = useState([])

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [])
  

  const getAllEmployees = () => {
    listEmployees()
        .then((response) => {
            setEmployees(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
  } 

  const addNewEmployee = () => {
    navigator('/add-employee');
  }

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`)
  }

  const removeEmployee = (employee_id) => {
    console.log(employee_id);

    deleteEmployee(employee_id)
        .then((response) => {
            console.log(response.data);
            getAllEmployees();
        })
        .catch((error) => {
            console.error(error);
        })
  }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-dark table-striped table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info '  onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger mx-4' onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent