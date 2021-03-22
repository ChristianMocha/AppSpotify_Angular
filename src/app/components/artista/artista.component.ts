import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent{

  artista: any = {};
  loading:boolean;
  topTracks: any[] = [];

  constructor(private activeRouter: ActivatedRoute, private spotify: SpotifyService) { 

    this.loading = true;

    this.activeRouter.params.subscribe( 
      res => {
        this.getArtista( res['id']);
        this.getTopTracks( res['id']);
      }
    )

  }


  getArtista( id: string){

    this.loading = true;
    
    this.spotify.getArtista(id).subscribe(
      res => {
        this.artista = res;
        this.loading = false;
      }
    )


  }

  getTopTracks(id: string){
    this.spotify.getTopTracks(id).subscribe(
      res => {
        console.log(res);
        this.topTracks = res
      }
    )
  }

}
