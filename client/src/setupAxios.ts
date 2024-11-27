import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

// const getToken = () => {
//   const authLocalStorage = JSON.parse(localStorage.getItem('auth') ?? '');
//   return authLocalStorage?.state?.token ?? '';
// };
//
// axios.defaults.headers.common.authorization = `Bearer ${getToken()}`;
