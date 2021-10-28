import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any;

  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qId;
    this.qTitle=this._route.snapshot.params.title;
    
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        
        this.questions=data;

      },
      (error)=>{
        //error
        console.log(error);
        
      }
    )

    
  }

}
