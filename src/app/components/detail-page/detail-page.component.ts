import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { TeamData } from '../../model/team-data';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  constructor(private activated: ActivatedRoute){}
  

  teamData: TeamData;

  ngOnInit() {
    this.activated.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((data) => {
        this.teamData = data.teamData;
      });
    }

      
  
}
