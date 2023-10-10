import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/model/note';
import { LoginService } from 'src/app/services/login.service';
import { NotesService } from 'src/app/services/notes.service';
@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css']
})
export class AddnotesComponent implements OnInit {
  addNoteForm!:FormGroup;
  noteModeObj:Note=new Note;
  currentUser:any;
  successAlert=false;
  constructor(private formBuilder:FormBuilder,private loginApi:LoginService,private noteApi:NotesService,private router:Router) { }

  ngOnInit(): void {
    this.addNoteForm = this.formBuilder.group({
      title:['',[Validators.maxLength(20)]],
      description:['',[Validators.pattern(/^[a-zA-Z0-9@,.;&*+\-\s]*$/),Validators.maxLength(500),this.noWhitespaceValidator]]
    });
    this.loginApi.getUserDetails(this.loginApi.getUser().username).subscribe(res=>{
      this.currentUser=res;
      console.log(this.currentUser.id);
    })
  }

  get func() {
    return this.addNoteForm.controls;
  }

  noWhitespaceValidator(control: { value: any; }) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  addNote(){
    if(this.addNoteForm.valid){
    this.noteModeObj.title=this.addNoteForm.value.title;
    this.noteModeObj.description=this.addNoteForm.value.description;
    this.noteApi.postNote(this.noteModeObj,this.currentUser.id).subscribe(res => {
      console.log(res);
      setTimeout(()=>{this.successAlert=true},100);
      setTimeout(()=>{this.router.navigate(['/notes'])},500);
    }, (err) => {
      console.log('Error');
      console.log(err);
    })
    //console.log(this.noteModeObj);
  }
  }
  closeSuccessAlert() {
    this.successAlert = false;
  }

}
