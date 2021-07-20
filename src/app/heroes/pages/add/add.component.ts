import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics',
    },
  ];

  heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.DCComics,
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroId(id)))
        .subscribe((heroe) => {
          this.heroe = heroe;
        });
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService
        .refreshHeroe(this.heroe)
        .subscribe((heroe) => this.mostrarMensaje('Registro Actualizado'));
    } else {
      this.heroesService.addHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarMensaje('Registro Creado');
      });
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe((heroe) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarMensaje(mensaje: string) {
    this.snackbar.open(mensaje, 'Cerrar', {
      duration: 2500,
    });
  }
}
