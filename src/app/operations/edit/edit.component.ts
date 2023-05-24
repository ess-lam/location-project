import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc,doc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditComponent>, private _fb: FormBuilder, private firestore: Firestore) {
    this.editForm = this._fb.group({
      vType: '',
      vMarque: '',
      vModele: '',
      vPuissance: '',
      gNom: '',
      gAdresse: '',
      cNom: '',
      cPrenom: '',
      cAdresse: '',
    });
  };

  saveData(){
    const collectionInstance = collection(this.firestore, 'location');
    addDoc(collectionInstance, this.editForm.value)
    .then(()=> {
      console.log("data saved successfuly");
      this.closeDialog();
    });
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
