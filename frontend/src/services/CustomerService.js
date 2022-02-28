import axios from 'axios';
import { useState } from 'react';
import AuthenticationService from './AuthenticationService';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/customers";



class CustomerService {

    getCustomers() {
        return axios.get(CUSTOMER_API_BASE_URL, this.getAuth());
    }

    createCustomer(customer) {
        return axios.post(CUSTOMER_API_BASE_URL, customer);
    }

    updateCustomer(customer, customerId) {
        return axios.put(CUSTOMER_API_BASE_URL + '/' + customerId, customer, this.getAuth());
    }

    deleteCustomer(customerId) {
        return axios.delete(CUSTOMER_API_BASE_URL + '/' + customerId, this.getAuth());
    }

    getCustomerById(customerId) {
        return axios.get(CUSTOMER_API_BASE_URL + '/get/' + customerId, this.getAuth());
    }

    getAuth() {
        return { headers: { authorization: AuthenticationService.createBasicAuthToken(sessionStorage.getItem("authenticatedUser"), sessionStorage.getItem("authenticatedPassword")) } }
    }

}

export default new CustomerService()