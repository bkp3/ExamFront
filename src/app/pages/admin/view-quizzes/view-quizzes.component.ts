import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:23,
      title:"Basic core java",
      description:"core java quiz",
      maxMarks:"50",
      numberOfQuestions:"20",
      active:"",
      category:{
        title:"programming",
      }
    },
    {
      qId:23,
      title:"Basic core java",
      description:"core java quiz",
      maxMarks:"50",
      numberOfQuestions:"20",
      active:"",
      category:{
        title:"programming",
      }
    },
  ]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this._quiz);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!','Error in loading data','error'); 
        
      }
    )
  }

}
