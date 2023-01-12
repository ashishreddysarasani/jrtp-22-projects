import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';
import { OTP } from '../../OTP';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  myotp:OTP = new OTP();
  constructor(private userservice:UserServiceService,private router:Router) { }


  ngOnInit(): void {
  }

  public GenerateOTP(otp:any){
    this.myotp=otp;
    console.log(this.myotp);
    this.otpvalidate();
  }
  otpvalidate(){
    this.userservice.validateotp(this.myotp).subscribe(
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
    this.validateotp();
  }
  saveContact(){
    this.contactService.validateotp(this.contact).subscribe(
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
