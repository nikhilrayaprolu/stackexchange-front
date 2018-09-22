import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  users = [];
  constructor(private router: Router,
              private userService: UserService) {
    this.userService.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;

    });
  }

  ngOnInit() {


  }

}
