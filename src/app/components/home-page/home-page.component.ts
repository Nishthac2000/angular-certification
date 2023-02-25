import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import {Team} from '../../model/team';
import {RapidApiService} from '../../services/rapid-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private rapidAPi : RapidApiService){}

  teams : Team[] = [];
  
  teamsList : Team[] = [];
  
  // teamId!: number;

  form = new FormGroup({
  //   //TODO
  //   teamName : new FormControl("1")
   })

   onSubmit(){
    // console.log(this.form.controls.teamName.value);
    
    console.log(this.teams);
    this.teams.forEach((team) => {
      //TODO
      if(team.id == 1){
        // console.log(team);
        this.teamsList.push(team);
      }
      
    })
  }
  ngOnInit():  void {
    this.loadTeams();
    
  }

  loadTeams(){
    this.rapidAPi.getTeamData().subscribe(( res : any) => {
      this.teams = res.data;
      
    })
   }

}