import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Student } from '../models/student';
import { Company } from '../models/company';
import { User, ChangePasswordUser } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    uri: string = "http://localhost:8080";
    token: string;
    id: string;
    type: string;


    constructor(private http: HttpClient) { }

    loadData() {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
        this.type = localStorage.getItem('type');
    }

    logout() {
        this.token = null;
        this.id = null;
        localStorage.clear();
    }

    registerStudent(student: Student) {
        return this.http.post(`${this.uri}/register/student`, student);
    }

    registerCompany(company: Company) {
        return this.http.post(`${this.uri}/register/company`, company);
    }

    loginCompany(company: User) {
        return this.http.post(`${this.uri}/login/company`, company);
    }
    loginStudent(student: User) {
        return this.http.post(`${this.uri}/login/student`, student);
    }
    loginAdmin(admin: User) {
        return this.http.post(`${this.uri}/login/admin`, admin);
    }

    changePasswordCompany(company: ChangePasswordUser) {
        return this.http.post(`${this.uri}/changePassword/company`, company);
    }
    changePasswordStudent(student: ChangePasswordUser) {
        return this.http.post(`${this.uri}/changePassword/student`, student);
    }
    changePasswordAdmin(admin: ChangePasswordUser) {
        return this.http.post(`${this.uri}/changePassword/admin`, admin);
    }

    getAdminData() {
        this.loadData();
        console.log(this.token);
        return this.http.get(`${this.uri}/profile`, { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    storeUserData(token: string, id: string, type: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('type', type);

        this.token = token;
        this.id = id;
        this.type = type;
    }

    loggedIn() {
        this.loadData();
        const helper = new JwtHelperService();
        if (this.token) {
            let ret = helper.isTokenExpired(this.token);
            return !ret;
        } else {
            return false;
        }
    }

    isAdmin() {
        return this.loggedIn() && this.type == "admin";
    }

    isStudent() {
        return this.loggedIn() && this.type == "student";
    }

    isCompany() {
        return this.loggedIn() && this.type == "company";
    }
}
