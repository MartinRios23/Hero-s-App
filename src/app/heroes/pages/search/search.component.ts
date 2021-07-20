import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  termino: string = '';
  heroes: Heroes[] = [];
  heroeSelected!: Heroes | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}
  buscando() {
    this.heroesService
      .getAutocomplete(this.termino.trim())
      .subscribe((heroe) => {
        this.heroes = heroe;
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSelected = undefined;
      return;
    }
    const heroe: Heroes = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroId(heroe.id!).subscribe((heroe) => {
      this.heroeSelected = heroe;
    });
  }
}
