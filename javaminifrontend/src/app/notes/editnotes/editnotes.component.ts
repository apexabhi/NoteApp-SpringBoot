import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/model/note';
import { LoginService } from 'src/app/services/login.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.css']
})
export class EditnotesComponent implements OnInit {
  noteid:any;
  notedata:any;
  editNoteForm!:FormGroup;
  noteModeObj:Note=new Note;
  successAlert=false;
  constructor(private formBuilder:FormBuilder,private loginApi:LoginService,private noteApi:NotesService,private router:Router, private act:ActivatedRoute) { }

  ngOnInit(): void {
    this.noteid=this.act.snapshot.paramMap.get('id');
    this.editNoteForm = this.formBuilder.group({
      title:['',[Validators.maxLength(20)]],
      description:['',[Validators.pattern(/^[a-zA-Z0-9@.,;&*+\-\s]*$/),Validators.maxLength(500),this.noWhitespaceValidator]]
    });

    this.noteApi.getNote(this.noteid).subscribe(res=>{
      this.notedata=res;
      console.log(this.notedata);
      this.editNoteForm.patchValue({
        title: this.notedata?.title || '', 
        description: this.notedata?.description || '', 
      });
    }, (err) => {
        console.log('Error');
        console.log(err);
      })

  }
  get func() {
    return this.editNoteForm.controls;
  }

  noWhitespaceValidator(control: { value: any; }) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  editNote(){
    if(this.editNoteForm.valid){
    this.noteModeObj.title=this.editNoteForm.value.title;
    this.noteModeObj.description=this.editNoteForm.value.description;
    this.noteApi.updateNote(this.noteModeObj,this.noteid).subscribe(res => {
      console.log(res);
       setTimeout(()=>{this.successAlert=true},100);
       setTimeout(()=>{this.router.navigate(['/notes'])},500);
    }, (err) => {
      console.log('Error');
      console.log(err);
    })
   // console.log(this.noteModeObj);
  }
  }
  closeSuccessAlert() {
    this.successAlert = false;
  }

}
