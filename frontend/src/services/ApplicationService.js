import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const APPLICATION_API_BASE_URL = "http://localhost:8080/api/v1/applications";

class ApplicationService {

    getApplications() {
        return axios.get(APPLICATION_API_BASE_URL, this.getAuth());
    }

    getApplication(identityNumber) {
        return axios.get(APPLICATION_API_BASE_URL + "/get-status/" + identityNumber);
    }

    getAuth() {
        return { headers: { authorization: AuthenticationService.createBasicAuthToken(sessionStorage.getItem("authenticatedUser"), sessionStorage.getItem("authenticatedPassword")) } }
    }

}

export default new ApplicationService()