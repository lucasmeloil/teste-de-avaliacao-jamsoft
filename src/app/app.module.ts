import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importe o RouterModule
import { AppRoutingModule } from './app-routing.module'; // Importe o AppRoutingModule

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, // Adicione o RouterModule aos imports
    AppRoutingModule, // Adicione o AppRoutingModule aos imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
