import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';

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
            { headers: { 'Content-type': 'application/json', 'auth': this.token }});
    }

    loadData() {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
    }
}
