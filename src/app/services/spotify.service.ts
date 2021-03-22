import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('listo');
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBsQACS7hhr6y30qCDtk2h1QUtelQdJzS6zTDkUaRRTwXZ9vRI1S6HFVGaxiFxJmtzaeDzkKZZJ0eyBDqw'
    });

    return this.http.get(url, {headers})
  }

  getNewReleases(){
    
    return  this.getQuery('browse/new-releases?limit=20').pipe(map(
      res => {
        return res['albums'].items;
      }
    ));
  }

  getArtistas(termino: string){
   
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe(map(
      res =>{
        return res['artists'].items;
      }
    ))
  }

  getArtista(id: string){
    return this.getQuery(`artists/${ id }`)
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`).pipe(map(
      res => {
       return  res['tracks'];
      }
    ))
  }
}
