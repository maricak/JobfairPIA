import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

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
