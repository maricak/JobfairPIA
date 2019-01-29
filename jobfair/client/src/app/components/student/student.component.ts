import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    message: string;
    messageClass: string;

    student: Student;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getStudent();
    }

    getStudent() {
        this.student = this.authService.getStudent();
        if (!this.student) {
            this.message = 'You have to be logged in';
            this.messageClass = 'alert alert-danger';
        }
    }
}
