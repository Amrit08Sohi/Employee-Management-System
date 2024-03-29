import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8081/api/employees/';

export const listEmployees = () => axios.get(REST_API_BASE_URL + 'all');

export const addEmployee = (employee) => axios.post(REST_API_BASE_URL + 'add', employee);

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + 'id/' + employeeId);

export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + 'update/id/' + employeeId, employee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + 'delete/id/' + employeeId);