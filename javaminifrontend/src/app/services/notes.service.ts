import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient) { }

  public getLatestNotes(id:any) {
    return this.http.get(`http://localhost:8090/notes/`+id);
  }

  public postNote(data:any,id:any){
    return this.http.post(`http://localhost:8090/notes/`+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  
  public deleteNote(noteid:any){
    return this.http.delete(`http://localhost:8090/notes/`+noteid);
  }

  public updateNote(data:any,noteid:any){
    return this.http.put(`http://localhost:8090/notes/`+noteid,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  public getNote(id:any) {
    return this.http.get(`http://localhost:8090/notes/unique/`+id);
  }
}
