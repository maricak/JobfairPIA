import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    uri: string = "http://localhost:8080";


    constructor(private http: HttpClient) { }

    getCompany(username : string) {   
        return this.http.get(`${this.uri}/company/info/${username}`);
    }
}
