import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { OpeningCreateComponent } from './components/opening-create/opening-create.component';
import { AdminComponent } from './components/admin/admin.component';
import { FairUpdateDeadlinesComponent } from './components/fair-update-deadlines/fair-update-deadlines.component';
import { FairCreateComponent } from './components/fair-create/fair-create.component';
import { FairCreateStep1Component } from './components/fair-create-step1/fair-create-step1.component';
import { FairCreateStep2Component } from './components/fair-create-step2/fair-create-step2.component';
import { FairCreateStep3Component } from './components/fair-create-step3/fair-create-step3.component';
import { FairCreateStep4Component } from './components/fair-create-step4/fair-create-step4.component';
import { FairApproveComponent } from './components/fair-approve/fair-approve.component';
import { FairApplyComponent } from './components/fair-apply/fair-apply.component';
import { FairUpdateMaxCompaniesComponent } from './components/fair-update-max-companies/fair-update-max-companies.component';
import { FairUpdatePeriodsComponent } from './components/fair-update-periods/fair-update-periods.component';
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
        OpeningCreateComponent,
        AdminComponent,
        FairUpdateDeadlinesComponent,
        FairCreateComponent,
        FairCreateStep1Component,
        FairCreateStep2Component,
        FairCreateStep3Component,
        FairCreateStep4Component,
        FairApproveComponent,
        FairApplyComponent,
        FairUpdateMaxCompaniesComponent,
        FairUpdatePeriodsComponent,
        // ErrorMessageDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule, 
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
