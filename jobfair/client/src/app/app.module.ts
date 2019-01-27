import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { SearchBasicComponent } from './components/search-basic/search-basic.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CvComponent } from './components/cv/cv.component';
import { StudentComponent } from './components/student/student.component';
import { SearchComplexComponent } from './components/search-complex/search-complex.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { OpeningInfoComponent } from './components/opening-info/opening-info.component';
import { CompanyComponent } from './components/company/company.component';
import { OpeningListComponent } from './components/opening-list/opening-list.component';
// import { ErrorMessageDirective } from './directives/error-message.directive';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        RegisterStudentComponent,
        RegisterCompanyComponent,
        SearchBasicComponent,
        ChangePasswordComponent,
        CvComponent,
        StudentComponent,
        SearchComplexComponent,
        CompanyInfoComponent,
        OpeningInfoComponent,
        CompanyComponent,
        OpeningListComponent,
        // ErrorMessageDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule, 
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
