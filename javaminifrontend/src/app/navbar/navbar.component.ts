import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogIn=false
  successAlert=false;
  user:any;
  constructor(private api:LoginService, private router:Router) {
   }

  ngOnInit(): void {
    this.isLogIn = this.api.isLoggedIn();
    this.api.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLogIn = this.api.isLoggedIn();
      //console.log(data);
    });
    if(this.isLogIn===true){
      this.user=this.api.getUser();
      console.log(this.user)

    }
  }

  public logout() {
    this.api.logout();
    this.router.navigate(['']);
    setTimeout(()=>{this.successAlert=true},100);
    setTimeout(()=>{
      window.location.reload();
    }, 200);
  }

  closeSuccessAlert() {
    this.successAlert = false;
  }

}
