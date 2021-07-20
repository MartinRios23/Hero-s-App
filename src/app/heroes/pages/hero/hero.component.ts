import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
      img{
        width:100%;
        border-radius: 5px;
      }
  `
  ]
})
export class HeroComponent implements OnInit {

  heroe!: Heroes;

  constructor( private activatedRoute:ActivatedRoute, private heroesService:HeroesService, private router:Router) { }

  ngOnInit(): void {
    //Acá extraigo las propiedades de la ruta activa. En este caso el id del heroe
    this.activatedRoute.params.pipe(switchMap(({id}) => this.heroesService.getHeroId(id))).subscribe(heroe =>{ this.heroe = heroe});
  }

  regresar(){
    this.router.navigate(['/heroes/list']);
  }

}
