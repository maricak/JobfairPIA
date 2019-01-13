import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register/student', component: RegisterStudentComponent, pathMatch: "full" },
    { path: 'register/company', component: RegisterCompanyComponent, pathMatch: "full" },

    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
