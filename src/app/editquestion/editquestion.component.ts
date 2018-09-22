import { Component, OnInit } from '@angular/core';
import {PostsService} from "../services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {
  questionid = 0;
  presentanswer = 0;
  question = {Question:{PostsDatum:null,Id:null, _id: null, PostTypeId: null},Answers:[]};
  Answers = [];
  presentsection = 0;
  presenttype = -1;
  picked = 0;
  pickedBy = '';
  currentuser = JSON.parse(localStorage.getItem('currentUser')).username;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private postsService: PostsService) {


  }
  pick(){
    this.pickedBy = this.currentuser;
    this.picked = 1;

    this.question.Question.PostsDatum.pickedBy = this.currentuser;
    this.question.Question.PostsDatum.picked = 1;
    this.question.Question.PostsDatum.pickedjustnow = 1;
    this.postsService.updateAnswer({answer: this.question.Question}).subscribe(res => {
      console.log(res);
    });
  };
  unpick(){
    this.pickedBy = '';
    this.picked = 0;
    this.question.Question.PostsDatum.unpickedjustnow = this.question.Question.PostsDatum.pickedBy;
    this.question.Question.PostsDatum.pickedBy = '';
    this.question.Question.PostsDatum.picked = 0;
    this.postsService.updateAnswer({answer: this.question.Question}).subscribe(res => {
      console.log(res);
    });

  };

  answernext( value){
    this.updatepresentanswer();
    this.presentanswer += value;
    if(this.presentanswer < 0){
      this.presentanswer = 0;
    }
    if (this.presentanswer > this.question.Answers.length-1){
      this.presentanswer = this.question.Answers.length-1;
    }
  }
  sectionshow( value){
    if (this.presentsection == 0 && this.pickedBy!=this.currentuser){
      $('.alert').css('display', 'block');
      console.log("please pick this question and then write the summarisation, All the Best");
    } else {
      this.presentsection += value;
    }

    if(this.presentsection < 0){
      this.presentsection = 0;
    }

    if (this.presentsection > 2){
      this.presentsection = 2;
    }
  }
  updatepresentanswer(){
    this.Answers[this.presentanswer].PostsDatum.writtenBy = JSON.parse(localStorage.getItem('currentUser')).username;
    this.postsService.updateAnswer({answer:this.Answers[this.presentanswer]}).subscribe(res => {
      console.log(res);
    });
  }
  questiontypeupdate(){
    this.question.Question.PostsDatum.writtenBy = JSON.parse(localStorage.getItem('currentUser')).username;
    this.question.Question.PostsDatum.PostType = this.presenttype;
    this.postsService.updateAnswer({answer: this.question.Question}).subscribe(res => {
      console.log(res);
    });
  }
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.questionid = params['id'];
      this.postsService.findAnswerstoQuestion({questionid: this.questionid }).subscribe( questions => {
          this.question = questions;

        if(!this.question.Question.PostsDatum){
          this.question.Question.PostsDatum = {};
          this.question.Question.PostsDatum.Id = this.question.Question._id;
          this.question.Question.PostsDatum.PostId = this.question.Question._id;
          this.question.Question.PostsDatum.PostTypeId = this.question.Question.PostTypeId;
          this.question.Question.PostsDatum.PostType = this.presenttype;
          this.question.Question.PostsDatum.Abstractive = "";
          this.question.Question.PostsDatum.Extractive = "";
          this.question.Question.PostsDatum.writtenBy = "";
          this.question.Question.PostsDatum.pickedBy = "";
          this.question.Question.PostsDatum.picked = 0;
          this.picked = 0;
          this.pickedBy = '';
        } else {
          this.pickedBy = this.question.Question.PostsDatum.pickedBy;
          this.picked = this.question.Question.PostsDatum.picked;
          this.presenttype = this.question.Question.PostsDatum.PostType;

        }
        questions.Answers.forEach(function(answer, index) {
          console.log(answer, index)
          if(!answer.PostsDatum){
            answer.PostsDatum = {};
            answer.PostsDatum.Id = answer._id;
            answer.PostsDatum.PostId = answer._id;
            answer.PostsDatum.PostTypeId = answer.PostTypeId;

            answer.PostsDatum.PostType = -1;
            answer.PostsDatum.Abstractive = "";
            answer.PostsDatum.Extractive = "";
            answer.PostsDatum.writtenBy = "";
            this.Answers.push(answer);
          } else {
            this.Answers.push(answer);
          }

        },this);
        }
      );
    });
  }

}
