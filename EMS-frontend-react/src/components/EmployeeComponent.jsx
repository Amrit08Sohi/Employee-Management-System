import React, { useState, useEffect } from "react";
import { addEmployee, getEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployee } from "../services/EmployeeService";
const EmployeeComponent = () => {
  /* These lines of code are using the `useState` hook from React to declare and initialize three state
  variables: `firstName`, `lastName`, and `email`. */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  /* `const navigate = useNavigate();` is using the `useNavigate` hook from the `react-router-dom`
  library to get the `navigate` function. The `navigate` function allows us to programmatically
  navigate to different routes in our application. It can be used to redirect the user to a
  different page or to navigate to a specific route based on certain conditions or events. */
  const navigate = useNavigate();

  /* `const { id } = useParams();` is extracting the value of the `id` parameter from the URL using the
  `useParams` hook from the `react-router-dom` library. It allows us to access the value of the `id`
  parameter that is passed in the URL. */
  const { id } = useParams();

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  `useEffect` hook is used to fetch employee data from the server and update the component's state
  variables (`firstName`, `lastName`, and `email`) when the `id` parameter changes. */
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  /* The line `const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' })` is
  declaring and initializing a state variable called `errors` using the `useState` hook from React. */
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  /**
   * The function `saveOrUpdateEmployee` is used to save or update an employee's information based on
   * whether an ID is provided or not.
   */
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            // log(response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        addEmployee(employee)
          .then((respone) => {
            console.log(respone);
            navigate("/employees");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is requires";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  /**
   * The function returns a React component that displays either "Update Employee" or "Add Employee"
   * based on the value of the variable "id".
   * @returns a JSX element. If the `id` variable is truthy, it will return a `<h2>` element with the
   * class name "text-center" and the text "Update Employee". If the `id` variable is falsy, it will
   * return a `<h2>` element with the class name "text-center" and the text "Add Employee".
   */
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email} </div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
