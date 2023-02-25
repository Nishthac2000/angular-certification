import { Injectable } from '@angular/core';


@Injectable()
export class RapidApiService {
  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  });
  public requestOptions = { headers: this.headers };
  constructor(private http : HttpClient) { }

  getTeamData(){
    return this.http.get('https://free-nba.p.rapidapi.com/teams', this.requestOptions);
  }
}
