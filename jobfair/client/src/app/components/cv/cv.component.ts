import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CV, Experience, Education, Language } from 'src/app/models/cv';

import * as v from 'src/app/validators';
import { AuthService } from 'src/app/services/auth.service';

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

    languageLevels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private studentService: StudentService, private router: Router) {
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
            organisationalSkills: ['', Validators.compose([
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
            drivingLicence: [false],
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
    get experience() { return this.form.controls['experience']; }
    get education() { return this.form.controls['education']; }
    get motherTongue() { return this.form.controls['motherTongue']; }
    get languages() { return this.form.controls['languages']; }
    get communicationSkills() { return this.form.controls['communicationSkills']; }
    get organisationalSkills() { return this.form.controls['organisationalSkills']; }
    get jobRelatedSkills() { return this.form.controls['jobRelatedSkills']; }
    get digitalSkills() { return this.form.controls['digitalSkills']; }
    get otherSkills() { return this.form.controls['otherSkills']; }
    get drivingLicence() { return this.form.controls['drivingLicence']; }
    get additionalInformation() { return this.form.controls['additionalInformation']; }


    ngOnInit() {
        this.student = this.authService.getStudent();
        if (this.student) {
            this.refreshForm();
        } else {
            this.message = 'You must bew logged in';
            this.messageClass = 'alert alert-danger';
        }
    }

    checkDates(startDate: string, endDate: string) {
        return (group: FormGroup) => {
            let start: Date = group.controls[startDate].value;
            let end: Date = group.controls[endDate].value;
            if (end && end <= start) {
                return { 'checkDates': true }
            } else {
                return null;
            }
        }
    }

    createExperience(startDate: Date, endDate: Date, position: string, employer: string, activities: string): FormGroup {
        return this.formBuilder.group({
            startDate: [startDate, Validators.compose([
                Validators.required
            ])],
            endDate: [endDate],
            position: [position, Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.position.minlength[0]),
                Validators.maxLength(this.vData.position.maxlength[0])
            ])],
            employer: [employer, Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.employer.minlength[0]),
                Validators.maxLength(this.vData.employer.maxlength[0])
            ])],
            activities: [activities, Validators.compose([
                Validators.minLength(this.vData.activities.minlength[0]),
                Validators.maxLength(this.vData.activities.maxlength[0])
            ])]
        }, { validator: this.checkDates('startDate', 'endDate') });
    }
    onAddExperience() {
        const e = <FormArray>this.form.get('experience');
        e.push(this.createExperience(undefined, undefined, undefined, undefined, undefined));
    }
    onDeleteExperience(i: number) {
        const e = <FormArray>this.form.get('experience');
        e.removeAt(i);
    }
    getExperience(): Experience[] {
        let ret: Experience[] = [];
        (<FormArray>this.experience).controls.forEach(f => {
            let e: Experience = {
                startDate: f.get('startDate').value,
                endDate: f.get('endDate').value,
                position: f.get('position').value,
                employer: f.get('employer').value,
                activities: f.get('activities').value,
            }
            ret.push(e);
        });
        return ret;
    }


    createEducation(startDate: Date, endDate: Date, qualification: string, institution: string, subjects: string): FormGroup {
        return this.formBuilder.group({
            startDate: [startDate, Validators.compose([
                Validators.required
            ])],
            endDate: [endDate],
            qualification: [qualification, Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.qualification.minlength[0]),
                Validators.maxLength(this.vData.qualification.maxlength[0])
            ])],
            institution: [institution, Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.institution.minlength[0]),
                Validators.maxLength(this.vData.institution.maxlength[0])
            ])],
            subjects: [subjects, Validators.compose([
                Validators.minLength(this.vData.subjects.minlength[0]),
                Validators.maxLength(this.vData.subjects.maxlength[0])
            ])]
        }, { validator: this.checkDates('startDate', 'endDate') });
    }
    onAddEducation() {
        const e = <FormArray>this.form.get('education');
        e.push(this.createEducation(undefined, undefined, undefined, undefined, undefined));
    }
    onDeleteEducation(i: number) {
        const e = <FormArray>this.form.get('education');
        e.removeAt(i);
    }
    getEducation(): Education[] {
        let ret: Education[] = [];
        (<FormArray>this.education).controls.forEach(f => {
            let e: Education = {
                startDate: f.get('startDate').value,
                endDate: f.get('endDate').value,
                qualification: f.get('qualification').value,
                institution: f.get('institution').value,
                subjects: f.get('subjects').value,
            }
            ret.push(e);
        });
        return ret;
    }

    createLanguage(language: string, listenig: string, reading: string, writing: string, speaking: string): FormGroup {
        return this.formBuilder.group({
            language: [language, Validators.required],
            listenig: [listenig ? listenig : 'A1', Validators.required],
            reading: [reading ? reading : 'A1', Validators.required],
            writing: [writing ? writing : 'A1', Validators.required],
            speaking: [speaking ? speaking : 'A1', Validators.required]
        });
    }
    onAddLanguage() {
        const e = <FormArray>this.form.get('languages')
        e.push(this.createLanguage(undefined, 'A1', 'A1', 'A1', 'A1'));
    }
    onDeleteLanguage(i: number) {
        const e = <FormArray>this.form.get('languages')
        e.removeAt(i);
    }
    getLanguages(): Language[] {
        let ret: Language[] = [];
        (<FormArray>this.languages).controls.forEach(f => {
            let e: Language = {
                language: f.get('language').value,
                listenig: f.get('listenig').value,
                reading: f.get('reading').value,
                speaking: f.get('speaking').value,
                writing: f.get('writing').value,
            }
            ret.push(e);
        });
        return ret;
    }

    onCvSubmit() {
        // console.log(this.form.controls);
        const cv: CV = {
            name: this.name.value,
            surname: this.surname.value,
            address: this.address.value,
            telephone: this.telephone.value,
            email: this.email.value,
            website: this.website.value,
            imAccount: this.imAccount.value,
            sex: this.sex.value,
            dateOfBirth: this.dateOfBirth.value,
            nationality: this.nationality.value,
            personalStatement: this.personalStatement.value,
            experience: this.getExperience(),
            education: this.getEducation(),
            motherTongue: this.motherTongue.value,
            languages: this.getLanguages(),
            communicationSkills: this.communicationSkills.value,
            organisationalSkills: this.organisationalSkills.value,
            jobRelatedSkills: this.jobRelatedSkills.value,
            digitalSkills: this.digitalSkills.value,
            otherSkills: this.otherSkills.value,
            drivingLicence: this.drivingLicence.value,
            additionalInformation: this.additionalInformation.value,
        };
        // console.log(this.form.value);
        console.log(cv);

        this.studentService.updateCv(cv).subscribe((data: { success: boolean, message: string, student: Student}) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.authService.setStudent(data.student);
                this.messageClass = 'alert alert-success';
                this.message = data.message;
            }
        });
    }



    refreshForm() {
        // console.log(this.student.cv);
        this.form.patchValue({
            name: this.student.cv.name,
            surname: this.student.cv.surname,
            address: this.student.cv.address,
            telephone: this.student.cv.telephone,
            email: this.student.cv.email,
            website: this.student.cv.website,
            imAccount: this.student.cv.imAccount,
            sex: this.student.cv.sex ? this.student.cv.sex : 'male',
            dateOfBirth: this.student.cv.dateOfBirth,
            nationality: this.student.cv.nationality,
            personalStatement: this.student.cv.personalStatement,
            motherTongue: this.student.cv.motherTongue,
            communicationSkills: this.student.cv.communicationSkills,
            organisationalSkills: this.student.cv.organisationalSkills,
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
        console.log(this.form);
    }
}
