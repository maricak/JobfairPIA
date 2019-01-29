import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { SearchBasicComponent } from './components/search-basic/search-basic.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { StudentComponent } from './components/student/student.component';
import { CvComponent } from './components/cv/cv.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { OpeningInfoComponent } from './components/opening-info/opening-info.component';
import { CompanyComponent } from './components/company/company.component';
import { OpeningCreateComponent } from './components/opening-create/opening-create.component';
import { AdminComponent } from './components/admin/admin.component';

import { StudentGuard } from './guards/student.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { HomeGuard } from './guards/home.guard';
import { CompanyGuard } from './guards/company.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
    { path: 'register/student', component: RegisterStudentComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
    { path: 'register/company', component: RegisterCompanyComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
    { path: 'changePassword', component: ChangePasswordComponent, pathMatch: 'full' },
    { path: 'search', component: SearchBasicComponent, pathMatch: 'full' },
    { path: 'student', component: StudentComponent, canActivate: [StudentGuard] },
    { path: 'student/cv', component: CvComponent, canActivate: [StudentGuard] },
    { path: 'opening/:id', component: OpeningInfoComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'company/:id', component: CompanyInfoComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'company', component: CompanyComponent, pathMatch: 'full', canActivate: [CompanyGuard] },
    { path: 'company/create/opening', component: OpeningCreateComponent, pathMatch: 'full', canActivate: [CompanyGuard] },
    { path: 'admin', component: AdminComponent, pathMatch: 'full', canActivate: [AdminGuard] },
    { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [HomeGuard] },
    { path: '**', component: LoginComponent, pathMatch: 'full', canActivate: [HomeGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
