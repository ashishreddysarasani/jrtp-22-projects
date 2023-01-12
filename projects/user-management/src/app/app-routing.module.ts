import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpComponent } from './components/otp/otp.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';

const routes: Routes = [
  {path: "reg",component:RegistrationComponent},
  {path: "",redirectTo:"reg",pathMatch:"full"},
  {path:"activate/:email",component:AccountActivationComponent},
  {path:"login",component:UserloginComponent},
  {path:"forgotpass",component:ForgotPasswordComponent},
  {path:"validateotp",component:OtpComponent}
];
//{path:'edit/:id',component:UserloginComponent}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
