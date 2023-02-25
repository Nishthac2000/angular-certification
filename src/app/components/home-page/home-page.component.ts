import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private rapidAPi : RapidAPIService){}

  teams : Team[] = [];
  
  teamsList : Team[] = [];
  
  // teamId!: number;

  form = new FormGroup({
    //TODO
    teamName : new FormControl("1")
  })

  ngOnInit() {
  }

}