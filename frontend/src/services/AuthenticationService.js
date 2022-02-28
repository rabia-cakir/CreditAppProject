import axios from 'axios';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

export const PASSWORD_SESSION_ATTRIBUTE_NAME = 'authenticatedPassword'

const AUTHENTİCATİON_API_BASE_URL = "http://localhost:8080/api/v1/auth";


class AuthenticationService {


    login(username, password) {
        return axios.post(AUTHENTİCATİON_API_BASE_URL, { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    successfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(PASSWORD_SESSION_ATTRIBUTE_NAME, password)
        window.location.href="/"
        this.createBasicAuthToken(username, password)
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(PASSWORD_SESSION_ATTRIBUTE_NAME);
        window.location.href="/"
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }
}

export default new AuthenticationService()
