import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

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

  constructor(private userService: UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        //alert("success");
       // this.snack.open("success","ok");
       Swal.fire('Successfully Registered', 'User is created', 'success');
        
      },
      (error)=>{
        //error
        console.log(error);
        //alert("something went wrong!!");
        this.snack.open("something went wrong","ok");
        //this.snack.open(error,"ok");
      }
    )
    
  }

}
