import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artistas: any[]=[];

  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    
   }

  ngOnInit(){
  }

  buscar(termino: string){
    this.loading = true;
    this.error = false;
    this.spotify.getArtistas(termino).subscribe(
      (res:any) => {
        console.log(res);
        this.artistas =res;
        this.loading = false;
      }, (err) => {
        this.loading = false;
        this.error = true
        this.mensajeError = err.error.error.message;

      }
    )

  }

}
