import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Note } from '../model/agenda.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  apiUrl = 'https://agenda-notes-backend.onrender.com/notes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  public getNotesWithFlag(flag: String): Observable<ResponsePageable> {
    console.log('Fetching notes with flag:', flag);
    return this.httpClient.get<ResponsePageable>(`${this.apiUrl}?flag=${flag}`).pipe(
      tap(response => console.log('Received response:', response)),
      catchError(error => {
        console.error('Error fetching notes:', error);
        return throwError(error);
      })
    );
  }

  public deleteNote(id: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.delete(`${this.apiUrl}/${id}`, options).pipe(
      catchError(error => {
        console.error('Error deleting note:', error);
        return throwError(error);
      })
    );
  }

  public idNotes(id: string): Observable<Note> {
    return this.httpClient.get<Note>(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('Received note by id:', response)),
      catchError(error => {
        console.error('Error fetching note by id:', error);
        return throwError(error);
      })
    );
  }

  public updateNote(id: string, note: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, note).pipe(
      catchError(error => {
        console.error('Error updating note:', error);
        return throwError(error);
      })
    );
  }

  public postNotes(note: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, note).pipe(
      catchError(error => {
        console.error('Error creating note:', error);
        return throwError(error);
      })
    );
  }
}
