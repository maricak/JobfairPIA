import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    uri: string = "http://localhost:8080";

    token: string
    id: string
    
    constructor(private http: HttpClient, private authService : AuthService) { }

    /*getCompany() {
        this.loadData();
        return this.http.get(`${this.uri}/company/account/${this.id}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }*/

    getCompanyInfo(id: string) {
        this.loadData();
        return this.http.get(`${this.uri}/company/info/${id}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    getCompanyOpenings() {
        this.loadData();        
        return this.http.get(`${this.uri}/company/openings/${this.id}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = this.authService.getToken();
        this.id = this.authService.getId();
    }
}
