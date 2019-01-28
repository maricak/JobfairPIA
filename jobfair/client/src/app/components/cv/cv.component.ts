import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CV } from 'src/app/models/cv';

import * as v from 'src/app/validators';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html'
})
export class CvComponent implements OnInit {

    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    student: Student;

    constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router) {
        this.vData = v.data;
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.minLength(this.vData.name.minlength[0]),
                Validators.maxLength(this.vData.name.maxlength[0])
            ])],
            surname: ['', Validators.compose([
                Validators.minLength(this.vData.surname.minlength[0]),
                Validators.maxLength(this.vData.surname.maxlength[0])
            ])],
            address: ['', Validators.compose([
                Validators.minLength(this.vData.address.minlength[0]),
                Validators.maxLength(this.vData.address.maxlength[0])
            ])],
            telephone: ['', Validators.compose([
                Validators.minLength(this.vData.telephone.minlength[0]),
                Validators.maxLength(this.vData.telephone.maxlength[0]),
                Validators.pattern(this.vData.telephone.pattern[0])
            ])],
            email: ['', Validators.compose([
                Validators.maxLength(this.vData.email.maxlength[0]),
                Validators.pattern(this.vData.email.pattern[0])
            ])],
            website: ['', Validators.compose([
                Validators.minLength(this.vData.website.minlength[0]),
                Validators.maxLength(this.vData.website.maxlength[0]),
                Validators.pattern(this.vData.website.pattern[0])
            ])],
            imAccount: ['', Validators.compose([
                Validators.minLength(this.vData.imAccount.minlength[0]),
                Validators.maxLength(this.vData.imAccount.maxlength[0])
            ])],
            sex: ['male', Validators.required],
            dateOfBirth: ['', Validators.compose([
                // ???????????????
                Validators.max(this.vData.dateOfBirth.max[0]),
            ])],
            nationality: ['', Validators.compose([
                Validators.minLength(this.vData.nationality.minlength[0]),
                Validators.maxLength(this.vData.nationality.maxlength[0])
            ])],
            personalStatement: ['', Validators.compose([
                Validators.minLength(this.vData.personalStatement.minlength[0]),
                Validators.maxLength(this.vData.personalStatement.maxlength[0])
            ])],
            experience: this.formBuilder.array([]),
            education: this.formBuilder.array([]),
            motherTongue: ['', Validators.compose([
                Validators.minLength(this.vData.motherTongue.minlength[0]),
                Validators.maxLength(this.vData.motherTongue.maxlength[0])
            ])],
            languages: this.formBuilder.array([]),
            communicationSkills: ['', Validators.compose([
                Validators.minLength(this.vData.skill.minlength[0]),
                Validators.maxLength(this.vData.skill.maxlength[0])
            ])],
            organisationslSkills: ['', Validators.compose([
                Validators.minLength(this.vData.skill.minlength[0]),
                Validators.maxLength(this.vData.skill.maxlength[0])
            ])],
            jobRelatedSkills: ['', Validators.compose([
                Validators.minLength(this.vData.skill.minlength[0]),
                Validators.maxLength(this.vData.skill.maxlength[0])
            ])],
            digitalSkills: ['', Validators.compose([
                Validators.minLength(this.vData.skill.minlength[0]),
                Validators.maxLength(this.vData.skill.maxlength[0])
            ])],
            otherSkills: ['', Validators.compose([
                Validators.minLength(this.vData.skill.minlength[0]),
                Validators.maxLength(this.vData.skill.maxlength[0])
            ])],
            drivingLicence:[false],
            additionalInformation: ['', Validators.compose([
                Validators.minLength(this.vData.additionalInformation.minlength[0]),
                Validators.maxLength(this.vData.additionalInformation.maxlength[0])
            ])]
        });
    }

    get name() { return this.form.controls['name']; }
    get surname() { return this.form.controls['surname']; }
    get address() { return this.form.controls['address']; }
    get telephone() { return this.form.controls['telephone']; }
    get email() { return this.form.controls['email']; }
    get website() { return this.form.controls['website']; }
    get imAccount() { return this.form.controls['imAccount']; }
    get sex() { return this.form.controls['sex']; }
    get dateOfBirth() { return this.form.controls['dateOfBirth']; }
    get personalStatement() { return this.form.controls['personalStatement']; }
    get nationality() { return this.form.controls['nationality']; }
    // exprinece
    //education
    get motherTongue() { return this.form.controls['motherTongue']; }
    // LANGUAGES
    get communicationSkills() { return this.form.controls['communicationSkills']; }
    get organisationslSkills() { return this.form.controls['organisationslSkills']; }
    get jobRelatedSkills() { return this.form.controls['jobRelatedSkills']; }
    get digitalSkills() { return this.form.controls['digitalSkills']; }
    get otherSkills() { return this.form.controls['otherSkills']; }
    get drivingLicence() { return this.form.controls['drivingLicence']; }
    get additionalInformation() { return this.form.controls['additionalInformation']; }




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
        const cv: CV = {
            name: this.form.get('name').value.trim(),
            surname: this.form.get('surname').value.trim(),
            address: this.form.get('address').value.trim(),
            telephone: this.form.get('telephone').value.trim(),
            email: this.form.get('email').value.trim(),
            website: this.form.get('website').value.trim(),
            imAccount: this.form.get('imAccount').value.trim(),
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
            website: this.student.cv.website,
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
        if (this.student.cv && this.student.cv.languages.length > 0) {
            this.student.cv.languages.forEach(e => {
                const el = <FormArray>this.form.get('languages');
                el.push(this.createLanguage(e.language, e.listenig, e.reading, e.writing, e.speaking));
            });
        }
    }   
}
