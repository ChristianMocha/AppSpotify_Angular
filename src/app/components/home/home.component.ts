
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[]=[];
  
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService) { 
    this.loading = true;
    this.error = false;
  
  }

  ngOnInit(){
    this.spotify.getNewReleases().subscribe(
      (res: any) => {
        this.nuevasCanciones = res;
        console.log(this.nuevasCanciones);
        this.loading = false;
      }, (err) => {
        this.loading = false;
        this.error = true
        this.mensajeError = err.error.error.message;

      }
    );
  }


}
