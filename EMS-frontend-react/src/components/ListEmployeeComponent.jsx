import React, { useState, useEffect } from 'react'
import { listEmployees } from '../services/EmployeeService'

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

  useEffect(() => {
    listEmployees()
        .then((response) => {
            setEmployees(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
  }, [])
  



  return (
    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <table className='table table-dark table-striped table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
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
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent