import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc, doc,updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  addForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddComponent>, private _fb: FormBuilder, private firestore: Firestore) {
    this.addForm = this._fb.group({
      vType: '',
      vMarque: '',
      vModele: '',
      vPuissance: '',
      gNom: '',
      gAdresse: '',
      cNom: '',
      cPrenom: '',
      cAdresse: '',
      id:'',
    });
  };

  async saveData(): Promise<void>{
    try{
      const collectionInstance = collection(this.firestore, 'location');
      const docRef = doc(collectionInstance);
      // this.addForm.patchValue({'id': docRef.id});
      const values = this.addForm.value;
      await addDoc(collectionInstance, values);
    } catch (error) {
      console.error('Error adding document:', error);
    }
    
  }
  
  closeDialog(){
    this.dialogRef.close();
  }
}
