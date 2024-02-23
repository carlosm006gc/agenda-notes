import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../model/agenda.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  apiUrl = 'https://agenda-notes-backend.onrender.com/notes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
  
  ) { }
  
  public getNotesWithFlag(flag: String): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag)
  }

  public deleteNote(id: string){
    return this.httpClient.delete("https://agenda-notes-backend.onrender.com/notes/".concat(id));
  }

  public idNotes(id: string): Observable<Note> {
    return this.httpClient.get<Note>(this.apiUrl + '/' + id);
  }
  public updateNote(id: string, note: any) {
    return this.httpClient.put(this.apiUrl + '/' + id, note);
  }
 public postNotes(note: any) {
    return this.httpClient.post(this.apiUrl, note);
  }
}
