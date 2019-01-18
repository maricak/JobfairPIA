import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    constructor(private service: AuthService, private router : Router) { }

    ngOnInit() {
    }

    onLogoutClick() {
        this.service.logout();
        this.router.navigate(['/']);
    }
}
