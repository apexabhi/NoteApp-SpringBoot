import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NotesService } from 'src/app/services/notes.service';
import { Router } from '@angular/router'; 
import { window } from 'rxjs';
@Component({
  selector: 'app-viewnotes',
  templateUrl: './viewnotes.component.html',
  styleUrls: ['./viewnotes.component.css']
})
export class ViewnotesComponent implements OnInit {
  currentUser:any;
  notes:any;
  successAlert=false;
  constructor(private noteApi:NotesService, private loginApi:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginApi.getUserDetails(this.loginApi.getUser().username).subscribe(res=>{
      this.currentUser=res;
      console.log(this.currentUser.id);
    })
    setTimeout(()=>this.noteApi.getLatestNotes(this.currentUser.id).subscribe(res=>{
      this.notes=res;
      console.log(this.notes);
    }),50);
    

  }

  delNote(noteid:any){
    this.noteApi.deleteNote(noteid).subscribe(res=>{
      console.log("record deleted");
      setTimeout(()=>{this.successAlert=true},100);
      setTimeout(()=>{location.reload()},500);
      //location.reload();
      

    })
  }
  closeSuccessAlert() {
    this.successAlert = false;
  }

}
