import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-bottom: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent implements OnInit {
  @Input() heroe!: Heroes;
  constructor() {}

  ngOnInit(): void {}
}
