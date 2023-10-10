import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesRoutingModule } from './notes-routing.module';
import { ViewnotesComponent } from './viewnotes/viewnotes.component';
import { AddnotesComponent } from './addnotes/addnotes.component';
import { EditnotesComponent } from './editnotes/editnotes.component';


@NgModule({
  declarations: [
    ViewnotesComponent,
    AddnotesComponent,
    EditnotesComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class NotesModule { }
