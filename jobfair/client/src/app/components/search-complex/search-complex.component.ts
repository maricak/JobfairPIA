import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { Opening } from 'src/app/models/opening';

@Component({
    selector: 'app-search-complex',
    templateUrl: './search-complex.component.html',
    styleUrls: ['./search-complex.component.css']
})
export class SearchComplexComponent implements OnInit {

    form: FormGroup;
    message: string = undefined;
    messageClass: string = undefined;
    companies: Company[] = [{
        email: "mejl", address: "adresa", city: " city", name: " name", numberOfEmployees: 5, pib: "112", specialty: "sdad", username: " udadsa", webSite: " dsdadsa", workField: "dsaads"
    }, {
        email: "mejl", address: "adresa", city: " city", name: " name", numberOfEmployees: 5, pib: "112", specialty: "sdad", username: " udadsa", webSite: " dsdadsa", workField: "dsaads"
    }];
    openings: Opening[] = [{name : "Dsad", type : "DSAD",companyName : "Dsdsa",companyUsername  : "dsasda",deadline : null,text :"dasadfdssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssss ssssssssssssssss sssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssss ssssssssssssssssssss ssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssss sssssssssss ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssss sssssssssssssssssssssssssssss ssssssssssssssss sssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdsa"}]
    // konkurs 

    constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            choice: ['', Validators.required], // kompanija, praksa, posao, praksa i posao, 
            companyName: [''],
            openingName: ['']
        })
    }

    ngOnInit() {
    }

    onSearchSubmit() {
        this.companies = undefined;
        this.openings = undefined;
        this.message = undefined;

        const body = {
            companyName: this.form.get('companyName').value.trim(),
            openingName: this.form.get('openingName').value.trim(),
            choice: this.form.get('choice').value.trim()
        };
        this.searchService.searchComplex(body).subscribe((data: {
            success: boolean, message: string, companies: Company[], openings: Opening[]
        }) => {
            console.log(data);
            if (data.success) {
                if (body.choice == "company") {
                    if (data.companies.length == 0) {
                        this.message = "There are no companies that match given criteria";
                        this.messageClass = 'alert alert-danger';
                    } else {
                        this.message = "Succesfull search!";
                        this.messageClass = 'alert alert-success';
                        this.companies = data.companies;
                    }
                } else {
                    if (data.openings.length == 0) {
                        this.message = "There are no openings that match given criteria";
                        this.messageClass = 'alert alert-danger';
                    } else {
                        this.message = "Succesfull search!";
                        this.messageClass = 'alert alert-success';
                        this.openings = data.openings;
                    }
                }
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }
}
