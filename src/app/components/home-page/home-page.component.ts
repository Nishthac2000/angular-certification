import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Team } from '../../model/team';
import { TeamData } from '../../model/team-data';
import { RapidApiService } from '../../services/rapid-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  // public teamsSelected: TeamData[] = [];

  constructor(private rapidAPi: RapidApiService, private router: Router) {}

  teams: Team[] = [];

  teamsDataList: TeamData[] = [];

  form = new FormGroup({
    teamName: new FormControl('1'),
  });

  remove(id: number) {
    this.teamsDataList = this.teamsDataList.filter((teamData) => {
      return teamData.team.id !== id;
    });
    localStorage.setItem('teamDataList', JSON.stringify(this.teamsDataList));
  }

  sendToResultPage(id: number) {
    let teamData: TeamData = this.teamsDataList.find(
      (teamData) => teamData.team.id === id
    );
    this.router.navigateByUrl(`results/${teamData.team.abbreviation}`, {
      state: { teamData: teamData },
    });
  }

  onSubmit() {
    let id = this.form.get('teamName').value;

    this.rapidAPi.getResultsByTeamId(id).subscribe((res: any) => {
      let teamData = new TeamData();
      teamData.results = res.data;

      //team
      this.teams.forEach((team) => {
        if (team.id === Number(id)) {
          teamData.team = team;
        }
      });

      let totalScoredPoint = 0;
      let totalConcededPoint = 0;

      teamData.results.forEach((result) => {
        if (result.home_team.id === Number(id)) {
          totalScoredPoint += result.home_team_score;
          totalConcededPoint += result.visitor_team_score;
        } else {
          totalScoredPoint += result.visitor_team_score;
          totalConcededPoint += result.home_team_score;
        }
      });

      teamData.avgPointConceded = Math.round(
        totalConcededPoint / teamData.results.length
      );
      teamData.avgPointScored = Math.round(
        totalScoredPoint / teamData.results.length
      );

      this.teamsDataList.push(teamData);

      console.log(this.teamsDataList);

      localStorage.setItem('teamDataList', JSON.stringify(this.teamsDataList));
    });
  }

  ngOnInit(): void {
    this.loadTeams();
    this.loadTeamData();
  }

  loadTeamData() {
    let storedTeamDataList = localStorage.getItem('teamDataList');
    if (storedTeamDataList === null) {
      localStorage.setItem('teamDataList', JSON.stringify([]));
    } else {
      this.teamsDataList = JSON.parse(storedTeamDataList);
    }
  }

  loadTeams() {
    this.rapidAPi.getTeamData().subscribe((res: any) => {
      this.teams = res.data;
     
    });
  }
}
