import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Fair, Application, Period } from '../models/fair';

@Injectable({
    providedIn: 'root'
})
export class FairService {
    uri: string = "http://localhost:8080";

    token: string
    id: string

    constructor(private http: HttpClient, private authService: AuthService) { }

    getCurrentFair() {
        this.loadData();
        return this.http.get(`${this.uri}/fair/current`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }
    updateDeadlines(fairId: string, applyDeadline: Date, cvDeadline: Date) {
        this.loadData();
        return this.http.post(`${this.uri}/fair/updateDeadlines`, { fairId: fairId, applyDeadline: applyDeadline, cvDeadline: cvDeadline },
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    createFair(fair: FormData) {
        this.loadData();
        return this.http.post(`${this.uri}/fair/create`, fair,
            { headers: {/* 'Content-type': 'application/json',*/ 'auth': this.token } });
    }

    apply(packages: string[]) {
        this.loadData();
        return this.http.post(`${this.uri}/fair/apply`, packages,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    getCompaniesToApprove(fairId: string) {
        this.loadData();
        return this.http.get(`${this.uri}/fair/forApproval/${fairId}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    approveCompanies(applications: Application[], fairId: string) {
        this.loadData();
        return this.http.post(`${this.uri}/fair/approveCompanies`, { applications: applications, fairId: fairId },
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    finishFair(fairId: string) {
        this.loadData();
        return this.http.get(`${this.uri}/fair/finish/${fairId}`,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    updateMaxCompanies(fair: Fair) {
        this.loadData();
        return this.http.post(`${this.uri}/fair/updateMaxCompanies`, fair,
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    setPeriods(periods: Period[], fairId: string) {
        this.loadData();
        return this.http.post(`${this.uri}/fair/setPeriods`, { periods: periods, fairId: fairId },
            { headers: { 'Content-type': 'application/json', 'auth': this.token } });
    }

    loadData() {
        this.token = this.authService.getToken();
        this.id = this.authService.getId();
    }
}
