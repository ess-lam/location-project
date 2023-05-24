import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './operations/add/add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'location-project';
  static _dialog: any;

  constructor(private _dialog: MatDialog) {}

  add(){
    this._dialog.open(AddComponent);
  }

}
