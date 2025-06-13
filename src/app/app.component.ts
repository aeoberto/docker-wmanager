import { Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HTTPClientService } from './http-client.service'; 
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import{ConfirmcreateComponent} from './confirmcreate/confirmcreate.component';

export interface containers {
  pos:number;
  id: string;
  name: string;
  cpu: number;
  is_run: string;
  
}

let container_list: containers[] = [
];



@Component({
  selector: 'app-root',
  imports: [MatIconModule, MatTableModule, MatButtonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})


export class AppComponent implements OnInit {
  constructor(private httpClientService: HTTPClientService, private dialog: MatDialog) {}
  displayedColumns: string[] = ['pos', 'id','name', 'cpu', 'is_running', 'actions'];
  dataSource = container_list;
  value = '';
  value1 = '';
   ngOnInit() {
    this.httpClientService.getID().subscribe(
     (response:any) => {
      let new_arr:containers[] = []
      for (var x in response){
        new_arr.push(response[x])
      }
      this.dataSource = new_arr
        console.log('HTTP response:', response);
      },
      (error) => {
        console.error('HTTP error:', error);
      }
    );
    
  }
  status(pos:any){
   this.httpClientService.status(pos).subscribe(
      (response: any) => {
         
         this.ngOnInit();
         
      },
      (error) => {
        this.ngOnInit();
        console.error('HTTP error:', error);
      }
    );
  
  }

  create(){

    const confirmDialog = this.dialog.open(ConfirmcreateComponent, {
      data: {
        title: 'Enter Name',
        message: ''
      }
    });
     
    
    confirmDialog.afterClosed().subscribe(result => {
      if (result !== false) {


        this.httpClientService.create_container(result).subscribe(
      (response:string) =>{
        
        console.log(response)
        if(response === 'Name already taken'){
        const confirmed = window.confirm(response);}
        this.ngOnInit(); 
      
      },
      
      (error) => {
        
        console.error('HTTP error:', error);
      }
    )
      }
      });
    
    
   
 
  }
delete(pos:any){


  const confirmed = window.confirm('Are you sure you want to delete this container?');

  if (confirmed) {
    this.dataSource.splice(pos, 1)
    this.dataSource = [...this.dataSource]
    console.log(this.dataSource)
    
    this.httpClientService.delete_container(pos).subscribe(
      (response: string) => {
         
      },
      (error) => {
        console.error('HTTP error:', error);
      }
    );
  
  
  
  }
}
      
    };

    
    

  
  
  

