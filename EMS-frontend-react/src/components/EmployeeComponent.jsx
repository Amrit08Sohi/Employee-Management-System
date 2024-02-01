import React, { useState } from 'react'
import { addEmployee } from '../services/EmployeeService';
import { useNavigate} from 'react-router-dom';

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 

  const navigate = useNavigate();



  const saveEmployee = (e) => {
    e.preventDefault();

    const employee = { firstName, lastName, email };

    addEmployee(employee)
        .then((respone) => {
            console.log(respone);
            navigate('/employees')
        })
    // console.log(employee);
  }

  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3'>
                <h2 className='text-center'>Add Employee</h2>
                <div className='card-body'>
                    <form action="">

                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input type="text" placeholder='Enter first name' name="firstName" value={firstName} className='form-control' onChange={(e) => setFirstName(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input type="text" placeholder='Enter Last name' name="lastName" value={lastName} className='form-control' onChange={(e) => setLastName(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input type="email" placeholder='Enter Email' name="email" value={email} className='form-control' onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <button className='btn btn-success' onClick={saveEmployee}>
                            Submit
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent