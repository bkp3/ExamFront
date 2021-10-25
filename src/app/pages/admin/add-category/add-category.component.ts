import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  category = {
    title: '',
    description: ''
  }

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null || this.category.description.trim() == '' || this.category.description == null) {
      this._snack.open("please fill field", "ok");
      return;
    }

    //all done

    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        console.log(data);
        //this._snack.open("Category added successfully!!", "Ok");
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!","Category is added successfully","success");
        
      },
      (error) => {
        console.log(error);
        //this._snack.open("Something went wrong!!", "Ok");
        Swal.fire("Error !!","Server error !!","error");
      }
    )
  }

}
