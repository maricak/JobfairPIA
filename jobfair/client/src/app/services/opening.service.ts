import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Opening, Application } from '../models/opening';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class OpeningService {

    uri: string = "http://localhost:8080";

    token: string
    id: string

    constructor(private http: HttpClient, private authService: AuthService) { }

    getOpening(id: string) {
        this.loadData();
        return this.http.get(`${this.uri}/opening/info/${id}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    createOpening(opening: FormData) {
        console.log(opening);
        this.loadData();
        return this.http.post(`${this.uri}/opening/create/`, opening,
            { headers: { /*'Content-type': 'application/json',*/ 'auth': this.token } });
    }

    apply(openingId: string, application: FormData) {
        console.log(openingId);
        console.log(application);
        application.append('openingId', openingId);
        this.loadData();
        return this.http.post(`${this.uri}/opening/apply/`, application/*{ openingId: openingId, application: application }*/,
            { headers: { /*'Content-type': 'application/json',*/ 'auth': this.token } });
    }

    update(opening: Opening) {
        console.log(opening);
        this.loadData();
        return this.http.post(`${this.uri}/opening/update/`, opening,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = this.authService.getToken();
        this.id = this.authService.getId();
    }
}
