import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router'; // Importe o Router
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
  next: boolean = false;
  waiting: boolean = false;
  checked: boolean = false;

  constructor(
    private rest: NoteService,
    public sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router // Injete o Router
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  openForm(id: any) {
    const _popup = this.dialog.open(NoteFormDialogComponent, {
      minWidth: '270px',
      data: { id: id }
    });

    _popup.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateNotes(id: any) {
    this.openForm(id);
    this.navigateToHome();
  }

  getNotes() {
    this.rest.getNotesWithFlag('next').subscribe(data => {
      this.notesNext = this.processNotes(data);
      this.next = true;
    });

    this.rest.getNotesWithFlag('waiting').subscribe(data => {
      this.notesWaiting = this.processNotes(data);
      this.waiting = true;
    });
  }

  processNotes(data: any): Note[] {
    return data.content.map((note: Note) => {
      note.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(note.agendaBody);
      return note;
    });
  }

  deleteNotes(id: string) {
    this.rest.deleteNote(id).subscribe(result => {
      this.getNotes();
      console.log('id deleted');
      this.navigateToHome();
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
