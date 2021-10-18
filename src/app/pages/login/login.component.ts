import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  };

  constructor(private snack:MatSnackBar,private login:LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login button clicked",this.loginData);

    if(this.loginData.username==''||this.loginData.username==null){
      this.snack.open("username is required","ok");
      return;
    }

    if(this.loginData.password==''||this.loginData.password==null){
      this.snack.open("password is required","ok");
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
      },
      (error)=>{
        console.log("Error");
        console.log(error);
      }
    )

    
  }



}
