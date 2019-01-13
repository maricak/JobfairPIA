import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    uri: string = "http://localhost:8080";
    token: string;
    username: string;
 

    constructor( private http : HttpClient) { }  

    loadToken() {
        this.token = localStorage.getItem('token');
    }

    logout() {
        this.token = null;
        this.username = null;
        localStorage.clear();
    }

    registerStudent(student) {
        return this.http.post(`${this.uri}/register/student`, student);
    }

    registerCompany(company) {
        return this.http.post(`${this.uri}/register/company`, company);
    }

    loginCompany(company) {
        return this.http.post(`${this.uri}/login/company`, company);
    }
    loginStudent(student) {
        console.log("student log in serveice");
        return this.http.post(`${this.uri}/login/student`, student);
    }
    loginAdmin(admin) {
        return this.http.post(`${this.uri}/login/admin`, admin);
    }

    getAdminData() {
        this.loadToken();
        console.log(this.token);
        return this.http.get(`${this.uri}/profile`, {headers : {'Content-type' : 'application/json', 'auth' : this.token}});
    }    

    storeUserData(token, username) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        this.token = token;
        this.username = username;
    }
}
