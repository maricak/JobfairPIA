import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isStudent()) {
            this.router.navigate(['/student']);
            return false;
        } else if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
            return false;
        } else if (this.authService.isCompany()) {
            this.router.navigate(['/company']);
            return false;
        } else {
            return true;
        }
    }
}
