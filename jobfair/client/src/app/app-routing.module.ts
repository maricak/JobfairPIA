import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { SearchBasicComponent } from './components/search-basic/search-basic.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { StudentComponent } from './components/student/student.component';

import { StudentGuard } from './guards/student.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { HomeGuard } from './guards/home.guard';
import { CvComponent } from './components/cv/cv.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
    { path: 'register/student', component: RegisterStudentComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
    { path: 'register/company', component: RegisterCompanyComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
    { path: 'changePassword', component: ChangePasswordComponent, pathMatch: 'full' },
    { path: 'search', component: SearchBasicComponent, pathMatch: 'full' },
    { path: 'student', component: StudentComponent, canActivate: [StudentGuard] },
    { path: 'student/cv', component: CvComponent, canActivate: [StudentGuard] },
    { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [HomeGuard] },
    { path: '**', component: LoginComponent, pathMatch: 'full', canActivate: [HomeGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
