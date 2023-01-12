import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';
import { UserReg } from '../../UserReg';
import { Country } from '../../Country';
import { State } from '../../State';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public isCityInValid:boolean = false;
  public isCountryInValid:boolean = false;
  public isStateInValid:boolean = false;

  userreg:UserReg = new UserReg();

  public country:any;
  public state:any;
  public city:any;

  isemailexist:boolean=false;
  isEmailSyntaxIsValid:boolean=false;
  emailExistStatus:string='';

  isFirstNameSyntaxIsValid:boolean=false;
  firNameErrorMsg:string='';

  isLastNameValid:boolean=false;
  lastNameErrorMsg:string='';
  
  constructor(private userservice:UserServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getAllCountries();
  }
  onFirstNameBlur(firname:string){
    //var fname = firname
     if(firname.length !=0 && firname.charCodeAt(0)>=65 && firname.charCodeAt(0)<=90){
       this.isFirstNameSyntaxIsValid=true;
       this.firNameErrorMsg='';  
       this.router.navigate(['/activate/ashishreddy@gmail.com']);
          
       //return 0;
       //0 indicates valid syntax Name
     }else if(firname.length==0){
      this.isLastNameValid=true;
      this.firNameErrorMsg='';  
    } 
     else {
       this.isFirstNameSyntaxIsValid=false;
       this.firNameErrorMsg='firstname Capital'; 
       //0 indicates valid syntax Name
       }
  }
  lastnameblur(name:any){
    if(name.lenght !=0 && name.charCodeAt(0)>=65 && name.charCodeAt(0)<=90){
      this.isLastNameValid=true;
      this.lastNameErrorMsg='';  
      //return 0;
      //0 indicates valid syntax Name
    }else if(name==0){
      this.isLastNameValid=true;
      this.lastNameErrorMsg='';  
    }
     else {
      this.isLastNameValid=false;
      this.lastNameErrorMsg='lastname Capital'; 
      //0 indicates valid syntax Name
      }
  }
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
  VerifyEmail(isvalidemail:any){
    var email = isvalidemail;
    var emailError = document.getElementById("emailError");
    var atPos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");

    if(atPos<=2  || (dotpos-atPos)<2) {
      this.isEmailSyntaxIsValid=false;
     this.emailExistStatus='email should starts with capital';
     return 1;
     //return 1 indicates not capital
      // emailError.innerHTML = "Invalid Email".fontcolor('red');
    } else {
      this.isEmailSyntaxIsValid=true;
     this.emailExistStatus='';  
     return 0;
     //return 0 indicates capital
      //emailError.innerHTML = "";
    }

  }
  onEmailBlur(isvalidemail:any){

    let emailsyntaxcorrect = this.VerifyEmail(isvalidemail);
    if(emailsyntaxcorrect==0){
      this.userservice.isvalidmail(isvalidemail).subscribe(
        data=>{
          if(data=="Email Valid"){
            this.isemailexist=true;
            this.emailExistStatus=data;
            console.log("your email already exist......");
                console.log(data);
                //this.router.navigate(['/activate/ashishreddy@gmail.com']);
          }
          else{
            this.emailExistStatus=data;
            console.log("your email avail to use......");
                console.log(data);
                this.isemailexist=false;
               // this.emailExistStatus='';
               //this.router.navigate(['/activate/ashishreddy@gmail.com']);
          }
        }
      );
    }
    
  }
  onChange(){
    this.isemailexist=false;
    this.emailExistStatus='';
  }
  getAllCountries(){
    this.userservice.getCountries().subscribe(
      data=>{
        
        this.country=data;
        console.log("in getAllCountries()");
        console.log(this.country);
        this.state=null;
        this.city=null;
      }
    );
  }
  getAllStates(countryid:any){
    this.userservice.getStates(countryid).subscribe(
      data=>{
        console.log("in getallstates()");
        this.state=data;
        this.city=null;
      
        console.log(this.state);
      }
    );
  }
  getAllCities(stateid:any){
    this.userservice.getCities(stateid).subscribe(
      data=>{
        this.city=data;
        
        console.log("in getAllCities");
        console.log(this.city);
      }
    );
  }
  public VerifyCountry(countryid:any){
    if(countryid=="-1") {
      this.isCountryInValid = true;
      console.log(countryid.target.value);
      this.state=null;
      this.city=null;
    } else {
      console.log(countryid.target.value);
      this.isCountryInValid = false;
      this.getAllStates(countryid.target.value);
    }
  }
  public verifyState(stateid:any){
    if(stateid=="-1") {
      this.isStateInValid = true;
      console.log(stateid.target.value);
      this.city=null;
    } else {
      console.log(stateid.target.value);
      this.isStateInValid = false;
      this.getAllCities(stateid.target.value);
    }
  }
  public VerifyCity(cityid:any){
    if(cityid=="-1") {
      this.isCityInValid = true;
    } else {
      console.log(this.state);
      this.isCityInValid = false;
      //this.getAllCities();
    }
  }
  public RegisterClick(frmreg:any){
    this.userreg=frmreg;
    console.log(this.userreg);
    this.saveUser();
  }
  saveUser(){
    this.userservice.createuser(this.userreg).subscribe(
      data=>{
        console.log("USER CREATED SUCCEFFULL......");
        console.log(data);
       // this.redirectToContactList();
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
}
