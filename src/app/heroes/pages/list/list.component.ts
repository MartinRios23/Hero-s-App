import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  heroesList:Heroes[] = [];

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
        .subscribe(heroes =>{
          this.heroesList = heroes;
        });
  }

}
