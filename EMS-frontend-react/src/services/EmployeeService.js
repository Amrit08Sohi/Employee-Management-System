import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8081/api/employees/';

export const listEmployees = () => axios.get(REST_API_BASE_URL + 'all');

export const addEmployee = (employee) => axios.post(REST_API_BASE_URL + 'add', employee)