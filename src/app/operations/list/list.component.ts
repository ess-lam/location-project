import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
// import { map, toArray } from 'rxjs/operators';

export interface Data {
  vType: string;
  vMarque: string;
  vModele: string;
  vPuissance: string;
  gNom: string;
  gAdresse: string;
  cNom: string;
  cPrenom: string;
  cAdresse: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements AfterViewInit{
  displayedColumns: string[] = [
    'vType', 'vMarque', 'vModele', 'vPuissance',
    'gNom', 'gAdresse', 'cNom', 'cPrenom', 'cAdresse',
    'actions'
  ];
  theData !: Observable<any>;
  dataSource !: MatTableDataSource<Data>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  static _dialog: any;

  constructor(private firestore: Firestore, private _dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource();
    const collectionInstance = collection(this.firestore, 'location');
    this.theData = collectionData(collectionInstance);
    this.theData.subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  edit(id:number){
    this._dialog.open(EditComponent);
  }

  delete(id:number){

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
