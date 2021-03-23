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
      
      'Authorization': 'Bearer BQDXg3Erplheqq63fgyEQN9wD0Z87iBNnI-CUPFr2Y-9TgBs7QHTINSeVqXfzI5KeVpw2KaE4kJwu6LYU24'
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
