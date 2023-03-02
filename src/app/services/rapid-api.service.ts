import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//Use of api key

export class RapidApiService {
  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  });
  public requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {}

  //endpoint

  getTeamData() {
    return this.http.get(
      'https://free-nba.p.rapidapi.com/teams',
      this.requestOptions
    );
  }

  //For Past 12 days 

  getPastDate() {
    let dateStr = '';

    for (let i = 1; i <= 12; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);

      dateStr += 'dates[]=';
      dateStr += date.getFullYear();
      dateStr += '-';
      dateStr += date.getMonth()+1;
      dateStr += '-';
      dateStr += date.getDate();
      dateStr += '&';
    }
    return dateStr;
  }

  getResultsByTeamId(teamId: string) {
    let date = this.getPastDate();
    return this.http.get(
      `https://free-nba.p.rapidapi.com/games?page=0&${date}per_page=12&team_ids[]=${teamId}
    `,
      this.requestOptions
    );
  }
 
}
