import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        alert("success");
        
      },
      (error)=>{
        //error
        console.log(error);
        alert("something went wrong!!");
      }
    )
    
  }

}
