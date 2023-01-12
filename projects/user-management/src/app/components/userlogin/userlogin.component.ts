import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../LoginCredentials';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  isemailexistInDB:boolean=false;
  isEmailSyntaxIsValid:boolean=false;
  emailExistStatus:string='';

  isPwdSyntaxIsValid:boolean=false;
  PWDStatusMsg:string='';

  login:LoginCredentials = new LoginCredentials();
  constructor(private userservice:UserServiceService,private router:Router) { }


  ngOnInit(): void {
  }
  VerifyPassword(isvalidPassword:string){
  
    var pwdlen = isvalidPassword.length;
    
    if(pwdlen<6){
      console.log("password should be minimum 6 chars");
      this.isPwdSyntaxIsValid=false;
      this.PWDStatusMsg='Your password should be minimum 6 chars';
    }else{
      console.log("password should be minimum 6 chars");
      this.isPwdSyntaxIsValid=true;
      this.PWDStatusMsg='';
    }
  }
  VerifyEmail(isvalidemail:string){
    var email = isvalidemail;

    var atPos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");

    if(email.length != 0 && atPos<=2  || (dotpos-atPos)<2) {
      this.isEmailSyntaxIsValid=false;
     this.emailExistStatus='email invalid';
     return 1;
     //return 1 indicates not capital
     
    } if(email.length==0){
      this.isEmailSyntaxIsValid=false;
      this.emailExistStatus='';
      return 1;
    }
    else {
      this.isEmailSyntaxIsValid=true;
     this.emailExistStatus='';  
     return 0;
     //return 0 indicates capital
      
    }

  }
  onEmailBlur(isvalidemail:string){

    let emailsyntaxcorrect = this.VerifyEmail(isvalidemail);
    if(emailsyntaxcorrect==0){
      this.userservice.isvalidmail(isvalidemail).subscribe(
        data=>{
          if(data=="Email Valid"){
            this.isemailexistInDB=true;
            this.emailExistStatus=data;
            console.log("your email already exist......");
                console.log(data);
          }
          else{
            this.emailExistStatus=data;
            console.log("your account with this email not found......");
                console.log(data);
                this.isemailexistInDB=false;
               // this.emailExistStatus='';
          }
        }
      );
    }
    
  }
  public LoginClick(login:any){
    this.login=login;
    console.log(this.login);
    this.verifylogin();
  }
  verifylogin(){
    this.userservice.verifycredentials(this.login).subscribe(
      data=>{
        console.log("SUCCEFFULL......");
        console.log(data);
        //this.redirectToContactList();
      }
    )
  }

  /*
  onSubmit(){
    console.log(this.contact);
    this.saveContact();
  }
  saveContact(){
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
 /*
  function VerifyName(){
    var username = document.getElementById("UserName").value;
    var error = document.getElementById("error");
    if(username.charCodeAt(0)>=65 && username.charCodeAt(0)<=90){
        error.innerHTML = "";
    } else {
        error.innerHTML = "Name must start with Uppercase letter".fontcolor('red');
    }
}
function VerifyEmail(){
    var email = document.getElementById("Email").value;
    var emailError = document.getElementById("emailError");
    var atPos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");

    if(atPos<=2  || (dotpos-atPos)<2) {
        emailError.innerHTML = "Invalid Email".fontcolor('red');
    } else {
        emailError.innerHTML = "";
    }
} */
}
