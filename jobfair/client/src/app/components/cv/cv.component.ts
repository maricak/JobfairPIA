import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html'
})
export class CvComponent implements OnInit {

    message: string;
    messageClass: string;

    student: Student;
    form: FormGroup;

    experiences: FormArray;

    constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router) {
        this.createForm();
    }
    createForm() {
        this.form = this.formBuilder.group({
            name: [''],
            surname: [''],
            address: [''],
            telephone: ['', this.validateTelephone],
            email: ['', this.validateEmail],
            webSite: ['', this.validateWebsite],
            imAccount: [''],
            sex: ['male'],
            dateOfBirth: [''],
            nationality: [''],
            personalStatement: [''],
            experience: this.formBuilder.array([]),
            education: this.formBuilder.array([]),
            motherTongue: [''],
            languages: this.formBuilder.array([]),
            communicationSkills: [''],
            organisationslSkills: [''],
            jobRelatedSkills: [''],
            digitalSkills: [''],
            otherSkills: [''],
            drivingLicence: [''],
            additionalInformation: ['']
        });
    }

    ngOnInit() {
        this.studentService.getStudent().subscribe((data: {
            success: boolean,
            message: string,
            student: Student
        }) => {
            if (data.success) {
                this.student = data.student;
                console.log("student data: ");
                console.log(this.student)
                this.refreshForm();
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    createExperience(startDate: Date, endDate: Date, position: string, employer: string, activities: string): FormGroup {
        return this.formBuilder.group({
            startDate: [startDate, Validators.required],
            endDate: [endDate],
            position: [position, Validators.required],
            employer: [employer, Validators.required],
            activities: [activities]
        });
    }

    onAddExperience() {
        const e = <FormArray>this.form.get('experience');
        e.push(this.createExperience(null, null, '', '', ''));
    }
    onDeleteExperience(i: number) {
        const e = <FormArray>this.form.get('experience');
        e.removeAt(i);
    }


    createEducation(startDate: Date, endDate: Date, qualification: string, institution: string, subjects: string): FormGroup {
        return this.formBuilder.group({
            startDate: [startDate, Validators.required],
            endDate: [endDate],
            qualification: [qualification, Validators.required],
            institution: [institution, Validators.required],
            subjects: [subjects]
        });
    }

    onAddEducation() {
        const e = <FormArray>this.form.get('education');
        e.push(this.createEducation(null, null, '', '', ''));
    }
    onDeleteEducation(i: number) {
        const e = <FormArray>this.form.get('education');
        e.removeAt(i);
    }

    createLanguage(language: string, listenig: string, reading: string, writing: string, speaking: string): FormGroup {
        return this.formBuilder.group({
            language: [language, Validators.required],
            listenig: [listenig, Validators.required],
            reading: [reading, Validators.required],
            writing: [writing, Validators.required],
            speaking: [speaking, Validators.required]
        });
    }

    onAddLanguage() {
        const e = <FormArray>this.form.get('languages')
        e.push(this.createLanguage('', '', '', '', ''));
    }
    onDeleteLanguage(i: number) {
        const e = <FormArray>this.form.get('languages')
        e.removeAt(i);
    }

    onCvSubmit() {
        console.log(this.form.controls);
        const cv = {
            name: this.form.get('name').value.trim(),
            surname: this.form.get('surname').value.trim(),
            telephone: this.form.get('telephone').value.trim(),
            email: this.form.get('email').value.trim(),
            webSite: this.form.get('webSite').value,
            imAccount: this.form.get('imAccount').value,
            sex: this.form.get('sex').value,
            dateOfBirth: this.form.get('dateOfBirth').value,
            nationality: this.form.get('nationality').value.trim(),
            personalStatement: this.form.get('personalStatement').value.trim(),
            experience: this.form.get('experience').value,
            education: this.form.get('education').value,
            motherTongue: this.form.get('motherTongue').value.trim(),
            languages: this.form.get('languages').value,
            communicationSkills: this.form.get('communicationSkills').value.trim(),
            organisationslSkills: this.form.get('organisationslSkills').value.trim(),
            jobRelatedSkills: this.form.get('jobRelatedSkills').value.trim(),
            digitalSkills: this.form.get('digitalSkills').value.trim(),
            otherSkills: this.form.get('otherSkills').value.trim(),
            drivingLicence: this.form.get('drivingLicence').value.trim(),
            additionalInformation: this.form.get('additionalInformation').value.trim(),
        };
        console.log(this.form.value);
    }

    refreshForm() {
        console.log(this.student.cv);
        this.form.patchValue({
            name: this.student.cv.name,
            surname: this.student.cv.surname,
            address: this.student.cv.address,
            telephone: this.student.cv.telephone,
            email: this.student.cv.email,
            webSite: this.student.cv.webSite,
            imAccount: this.student.cv.imAccount,
            sex: this.student.cv.sex,
            dateOfBirth: this.student.cv.dateOfBirth,
            nationality: this.student.cv.nationality,
            personalStatement: this.student.cv.personalStatement,
            motherTongue: this.student.cv.motherTongue,
            communicationSkills: this.student.cv.communicationSkills,
            organisationslSkills: this.student.cv.organisationslSkills,
            jobRelatedSkills: this.student.cv.jobRelatedSkills,
            digitalSkills: this.student.cv.digitalSkills,
            otherSkills: this.student.cv.otherSkills,
            drivingLicence: this.student.cv.drivingLicence,
            additionalInformation: this.student.cv.additionalInformation
        });
        if (this.student.cv && this.student.cv.experience.length > 0) {
            this.student.cv.experience.forEach(e => {
                const el = <FormArray>this.form.get('experience');
                el.push(this.createExperience(e.startDate, e.endDate, e.position, e.employer, e.activities));
            });
        }

        if (this.student.cv && this.student.cv.education.length > 0) {
            this.student.cv.education.forEach(e => {
                const el = <FormArray>this.form.get('education');
                el.push(this.createEducation(e.startDate, e.endDate, e.qualification, e.institution, e.subjects));
            });
        }

        if (this.student.cv && this.student.cv.languagues.length > 0) {
            this.student.cv.languagues.forEach(e => {
                const el = <FormArray>this.form.get('languagues');
                el.push(this.createLanguage(e.language, e.listenig, e.reading, e.writing, e.speaking));
            });
        }
    }
    validateTelephone(controls) {
        const regExp = new RegExp(/^[0-9]*$/);
        if (!controls.value || regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateTelephone': true }
        }
    }

    validateEmail(controls) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!controls.value || regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateEmail': true }
        }
    }
    validateWebsite(controls) {
        const regExp = new RegExp(/^w{3}[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
        if (!controls.value || regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateWebsite': true }
        }
    }


}
