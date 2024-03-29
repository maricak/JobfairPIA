import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { CV } from '../models/cv';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    uri: string = "http://localhost:8080";
    student: Student;

    token: string
    id: string

    constructor(private http: HttpClient, private authService: AuthService) { }

    getStudent() {
        this.loadData();
        return this.http.get(`${this.uri}/student/account/${this.id}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }
    updateCv(cv: CV) {
        this.loadData();
        return this.http.post(`${this.uri}/student/cvupdate`, cv,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = this.authService.getToken();
        this.id = this.authService.getId();
    }
}
