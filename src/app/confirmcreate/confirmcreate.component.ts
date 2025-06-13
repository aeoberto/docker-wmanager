import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmcreate',
  imports: [MatIconModule, MatTableModule, MatButtonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './confirmcreate.component.html',
  styleUrl: './confirmcreate.component.css'
})




export class ConfirmcreateComponent implements OnInit {
  value1 = ''
  title = ''
  message = ''
  constructor(public dialogRef: MatDialogRef<ConfirmcreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit() {
  }

}
