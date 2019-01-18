import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    message: string;
    messageClass: string;

    student: Student;

    constructor(private studentService: StudentService) { }

    ngOnInit() {
        this.getStudent();
    }

    getStudent() {
        this.studentService.getStudent().subscribe((data: {
            success: boolean,
            message: string,
            student: Student
        }) => {
            if (data.success) {
                this.student = data.student;
            } else {
                console.log(data);
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

}
