import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';
import { ForgotPassword } from '../../ForgotPassword';
import { OTP } from '../../OTP';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myotp:OTP = new OTP();
  email:String='';

  isotpcorrect:boolean=false;
  otpSuccessStatus:string='';

  otpgenerated:boolean=false;

  isemailexist:boolean=false;
  emailExistStatus:string='';

  forgotpwd:ForgotPassword = new ForgotPassword();

  constructor(private userservice:UserServiceService,private router:Router) { }


  ngOnInit(): void {
  }

  isvalidemail(isvalidemail:any){

    this.userservice.isvalidmail(isvalidemail).subscribe(
      data=>{
        if(data=="Email Exist"){
          this.isemailexist=true;
          this.emailExistStatus=data;
          console.log("your email exists status......");
              console.log(data);
        }
        else{
          this.isemailexist=false;
          this.emailExistStatus=data;
          console.log("your email exists status......");
              console.log(data);
        }
      }
    )
  }
  public GenerateAndValidateOTPOnClick(forgotpwd:any){
    if(this.otpgenerated) {
    this.ValidateOTP(forgotpwd); }
    else {
    this.forgotpwd=forgotpwd;
    this.otpgenerated=true;
    console.log(this.forgotpwd);
    this.GenerateOTP();
    }
  }
  GenerateOTP(){
    this.userservice.generateotp(this.forgotpwd.email).subscribe(
      data=>{
        if(data=="otp printed in console and stored in db and expires in 1 minute  ") {
          console.log("SUCCEFFULL......");
          console.log(data);
          this.otpgenerated=true;
          this.email=this.forgotpwd.email;
          this.otpSuccessStatus='Enter your OTP';
        }else{
          this.otpgenerated=false;
          this.otpSuccessStatus='Email is invalid';
          console.log("not SUCCEFFULL......");
          console.log(data);
          
        }
        //console.log("not SUCCEFFULL......");
        //console.log(data);
        //this.redirectToContactList();
      }
    )
  }

  public ValidateOTP(otp:any){
    this.myotp=otp;
    console.log(this.myotp);
    this.myotp.email=this.email;
    this.otpvalidate();
  }
  otpvalidate(){
    this.userservice.validateotp(this.myotp).subscribe(
      data=>{
        if(data=="your otp is correct"){
          this.isotpcorrect=true;
        this.otpSuccessStatus=data;
        console.log("SUCCEFFULL......");
        console.log(data);
        }else{
          this.isotpcorrect=false;
          this.otpSuccessStatus=data;
        }
        /*
        this.otpvalidated=true;
        this.otpcorrect=data;
        console.log("SUCCEFFULL......");
        console.log(data);
        //this.redirectToContactList();
        */
      }
    )
  }
  /*
  onSubmit(){
    console.log(this.contact);
    this.forgotpassword();
  }
  forgotpassword(){
    this.contactService.createContact(this.contact).subscribe(
      data=>{
        console.log("SUCCEFFULL......");
        console.log(data);
        this.redirectToContactList();
      }
    )
  }
  redirectToContactList(){
    this.router.navigate(['/contacts']);
  }
  */
}
