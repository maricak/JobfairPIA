import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    uri: string = "http://localhost:8080";

    token: string
    id: string

    constructor(private http: HttpClient, private authService: AuthService) { }

    searchBasic(data) {
        return this.http.post(`${this.uri}/search/basic`, data);
    }

    searchComplex(data) {
        this.loadData();
        console.log(this.token);
        return this.http.post(`${this.uri}/search/complex`, data,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = this.authService.getToken();
        this.id = this.authService.getId();
    }
}
