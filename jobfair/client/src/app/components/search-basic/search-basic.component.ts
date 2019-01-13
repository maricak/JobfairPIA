import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { fdatasync } from 'fs';

@Component({
    selector: 'app-search-basic',
    templateUrl: './search-basic.component.html',
    styleUrls: ['./search-basic.component.css']
})
export class SearchBasicComponent implements OnInit {

    form: FormGroup;
    message: string = undefined;
    messageClass: string = undefined;
    companies: {
        name: string,
        city: string,
        address: string,
        pib: string,
        numberOfEmployees: number,
        email: string,
        webSite: string,
        workField: string,
        specialty: string
    }[];


    constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) {
        this.createForm();
    }
    createForm() {
        this.form = this.formBuilder.group({
            name: [''],
            city: [''],
            workField: [''],
        });
    }
    ngOnInit() {
    }

    onSeachSubmit() {

        this.companies = undefined;
        this.message = undefined;

        const company = {
            name: this.form.get('name').value.trim(),
            city: this.form.get('city').value.trim(),
            workFields: this.form.get('workField').value,
        };
        this.searchService.searchBasic(company).subscribe((data: {
            success: boolean,
            message: string,
            companies: {
                name: string,
                city: string,
                address: string,
                pib: string,
                numberOfEmployees: number,
                email: string,
                webSite: string,
                workField: string,
                specialty: string
            }[]
        }) => {
            console.log(data);
            if (data.success) {
                if (data.companies.length == 0) {
                    this.message = "There are no companies that match given criteria";
                    this.messageClass = 'alert alert-danger';
                } else {  
                    this.message = "Succesfull search!";
                    this.messageClass = 'alert alert-success';                 
                    this.companies = data.companies;
                }
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }      
        });
    }

}
