import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivateAcc } from '../../ActivateAcc';
@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

  isemailexist:boolean=false;
  emailExistStatus:string='';

  newPwd:string='';
  confirmationPwd:string='';

  accActive:ActivateAcc = new ActivateAcc();

  Email:string | null='';
  constructor(private userservice:UserServiceService,private activatedRoute:ActivatedRoute,private router:Router) { }

  isNewAndConfirmPwdSame:boolean=false;
  NewAndConfirmPwdMatchStatus:string='';

  ngOnInit(): void {

    this.Email=this.activatedRoute.snapshot.paramMap.get("email");
  }

  onBlurConfirmPwds(matchpwd:string){

    if(matchpwd!=this.confirmationPwd){
    this.confirmationPwd=matchpwd;
    }
    if(this.confirmationPwd==this.newPwd){
      this.NewAndConfirmPwdMatchStatus='';
    }
    else{
      this.NewAndConfirmPwdMatchStatus='new & confirm passwords should match';
    }
  }
  onBlurNewPwds(matchpwd:string){

    if(matchpwd!=this.newPwd){
    this.newPwd=matchpwd;
    }
    if(this.confirmationPwd==this.newPwd){
      this.NewAndConfirmPwdMatchStatus='';
    }
    else{
      this.NewAndConfirmPwdMatchStatus='new & confirm passwords should match';
    }
  }
  
  isvalidemail(isvalidemail:any){

    this.userservice.isvalidmail(isvalidemail).subscribe(
      data=>{
        if(data=="Email Exist"){
          this.isemailexist=true;
          this.emailExistStatus=data;
          console.log("your email already exist......");
              console.log(data);
        }
        else{
          this.emailExistStatus=data;
          console.log("your email avail to use......");
              console.log(data);
              this.isemailexist=false;
             // this.emailExistStatus='';
        }
      }
    )
  }
  public ActivateAccount(accActive:any){
    this.accActive=accActive;
    console.log(accActive);
    this.activateacc(this.accActive);
  }
  activateacc(accActive:any){
    this.userservice.accountactivate(this.accActive).subscribe(
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
}
