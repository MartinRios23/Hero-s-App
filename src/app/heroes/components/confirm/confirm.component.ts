import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {

  constructor(private dialogref:MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data:Heroes) { }

  ngOnInit(): void {
  }

  borrar(){
    this.dialogref.close(true);
  }

  cerrar(){
    this.dialogref.close();
  }

}
