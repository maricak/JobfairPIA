import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    uri: string = "http://localhost:8080";

    token: string
    id: string
    
    constructor(private http: HttpClient) { }

    getCompany() {
        this.loadData();
        return this.http.get(`${this.uri}/company/acc/${this.id}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    getCompanyInfo(username: string) {
        this.loadData();
        return this.http.get(`${this.uri}/company/info/${username}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
    }
}
