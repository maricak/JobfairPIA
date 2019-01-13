import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { SearchBasicComponent } from './components/search-basic/search-basic.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent, pathMatch: "full" },
    { path: 'register/student', component: RegisterStudentComponent, pathMatch: "full" },
    { path: 'register/company', component: RegisterCompanyComponent, pathMatch: "full" },
    { path: 'changePassword', component: ChangePasswordComponent, pathMatch: "full" },
    { path: 'search', component: SearchBasicComponent, pathMatch: "full" },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
