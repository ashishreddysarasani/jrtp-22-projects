import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReg } from './UserReg';
import { LoginCredentials } from './LoginCredentials';
import { ActivateAcc } from './ActivateAcc';
import { ForgotPassword } from './ForgotPassword';
import { OTP } from './OTP';
import { Country } from './Country';
import { State } from './State';
import { City } from './City';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl='http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  createuser(userreg:UserReg):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/registeraccount`,userreg,{responseType:"text"});
  }
  isvalidmail(email:string):Observable<string>{
    return this.httpClient.get(`${this.baseUrl}/isValidEmail/${email}`,{responseType:"text"});
  }
  verifycredentials(logincredentials:LoginCredentials):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/login`,logincredentials,{responseType:"text"});
  }
  accountactivate(accountactivate:ActivateAcc):Observable<Object>{
    console.log(accountactivate);
    return this.httpClient.post(`${this.baseUrl}/accoountAvtivation`,accountactivate,{responseType:"text"});
  
  }
  generateotp(forgotpassword:String):Observable<Object>{
    return this.httpClient.get(`${this.baseUrl}/forgotpwd/${forgotpassword}`,{responseType:"text"});
  }
  validateotp(otp:OTP):Observable<string>{
    return this.httpClient.get(`${this.baseUrl}/validateotp/${otp.email}/${otp.otp}`,{responseType:"text"});
  }
  getCountries():Observable<Object>{
    return this.httpClient.get(`${this.baseUrl}/getallcountries`);
  }
  getStates(country:number):Observable<Object>{
    console.log(country);
    
    return this.httpClient.get(`${this.baseUrl}/getstates/${country}`,{responseType:"json"});
  }
  getCities(state:number):Observable<Object>{
    console.log(state);
    return this.httpClient.get(`${this.baseUrl}/getcities/${state}`,{responseType:"json"});
  }
}



  /*
  getAllContacts():Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(`${this.baseUrl}/contacts`);
  }
  createContact(contact:Contact):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/addcontact`,contact,{responseType:"text"});
  }
  removeContact(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/contact/${id}`,{responseType:"text"})
  }
  findContact(id:Number):Observable<Contact>{
    return this.httpClient.get<Contact>(`${this.baseUrl}/contact/${id}`)
  }
*/

