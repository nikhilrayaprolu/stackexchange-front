import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  presentoffset = 0;
  presentlimit = 10;
  questions = [];
  searchtext = '';
  topic = 'All';
  completion = 'All';

  currentuser = JSON.parse(localStorage.getItem('currentUser')).username;
  constructor(private router: Router, private activatedroute: ActivatedRoute, private postsService: PostsService) {
    this.postsService.findAllQuestions({offset: this.presentoffset, limit: this.presentlimit, pickedBy: this.currentuser, completion: this.completion}).subscribe( questions => {
        this.questions=(questions);
      }
    )
  }
  search(){
    this.postsService.findAllQuestions({topic: this.topic, searchtext: this.searchtext,offset: this.presentoffset, limit: this.presentlimit, completion: this.completion}).subscribe( questions => {
        this.questions = (questions);
      }
    )
  }
  edit(questionid) {
    this.router.navigate(['/editquestion', questionid]);
  }
  ngOnInit() {
  }
  onScroll () {
    console.log("scrolled");
    this.presentoffset += 10;
    this.postsService.findAllQuestions({searchtext: this.searchtext,offset: this.presentoffset, limit: this.presentlimit,pickedBy: this.currentuser, completion: this.completion }).subscribe( questions => {
      this.questions = this.questions.concat(questions);
    })
  }
}
