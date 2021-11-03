import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  constructor(private locationSt: LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }

  public loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        //success
        //console.log(data);
        this.questions=data;
        console.log(this.questions);
        
      },
      (error)=>{
        //error
        console.log(error);
        
      }
    );

  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(
      () => {
        history.pushState(null, location.href);
      }
    )
  }

}
