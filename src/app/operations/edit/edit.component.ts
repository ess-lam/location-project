import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, getDoc, updateDoc,doc,collection,query,where } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editForm!: FormGroup;
  values: any;

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    private _fb: FormBuilder,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.ngOnInit();
      
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
  }

  async ngOnInit(){
    const docRef = doc(this.firestore, "location", this.data.id);
    try {
      const docSnap = await getDoc(docRef);
      this.values= docSnap.data();
      console.log(docSnap.id+' '+ this.values['vType']);

      this.editForm = this._fb.group({
        vType: this.values['vType'],
        vMarque: this.values['vMarque'],
        vModele: this.values['vModele'],
        vPuissance: this.values['vPuissance'],
        gNom: this.values['gNom'],
        gAdresse: this.values['gAdresse'],
        cNom: this.values['cNom'],
        cPrenom: this.values['cPrenom'],
        cAdresse: this.values['cAdresse'],
      })
      
  } catch(error) {
      console.log(error)
  }
  }
  saveData(){
    const collectionInstance = doc(this.firestore, 'location',this.data.id);
    updateDoc(collectionInstance, this.editForm.value)
    .then(()=> {
      console.log("data updated successfuly");
      // this.closeDialog();
    })
    .catch((err)=>{
      console.log('error: ',err)
    });
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
