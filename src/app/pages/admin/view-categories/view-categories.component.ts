import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any;

  constructor(private _category:CategoryService,private snack:MatSnackBar) { }



  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any)=>{
        //success
        this.categories=data;
        console.log(data);
        
      },
      (error)=>{
        //error
        console.log(error);
        this.snack.open("something went wrong!!", "ok");
      }
    );

  }

}
