import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Note } from 'src/app/shared/model/agenda.model';
import { NoteService } from 'src/app/shared/service/agenda.service';
import { NoteFormDialogComponent } from '../note-form-dialog/note-form-dialog.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notesNext: Note[];
  notesWaiting: Note[];
  notesFinished: Note[];
  next: boolean = false;
  waiting: boolean = false;
  url: string = '';
  urlSafe: SafeResourceUrl;
  Note: Note[];
  checked: boolean = false;
  id: Note[];
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor(
    private rest: NoteService,
    public sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
   this.getNotes();
  }



  openForm(id: any) {
    const _popup = this.dialog.open(NoteFormDialogComponent, {
      minWidth:'270px',
      data: {
        id: id
      }
    });

    _popup.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  updateNotes(id: any) {
    console.log('update note');
    this.openForm(id);
  }
  
  getNotes(){
    this.rest.getNotesWithFlag('next').subscribe(data => {
      this.notesNext = data.content;
      this.notesNext.forEach(note => {
        note.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(note.agendaBody);
      });
      this.next = true;
    });

    this.rest.getNotesWithFlag('waiting').subscribe(data => {
      this.notesWaiting = data.content;
      this.notesWaiting.forEach(note => {
        note.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(note.agendaBody);
      });
      this.waiting = true;
    });

  }
  deleteNotes(id: string){
    this.rest.deleteNote(id).subscribe(result => {});
    console.log('id deleted');
    window.location.reload();
  }
  
}