import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    uri: string = "http://localhost:8080";


    constructor(private http: HttpClient) { }

    searchBasic(data) {   
        return this.http.post(`${this.uri}/search/basic`, data);
    }
}
