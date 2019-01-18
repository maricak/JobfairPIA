import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OpeningService {

    uri: string = "http://localhost:8080";


    token: string
    id: string


    constructor(private http: HttpClient) { }

    getOpening(id: string) {
        this.loadData();
        return this.http.get(`${this.uri}/opening/info/${id}`, 
        { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
    }
}
