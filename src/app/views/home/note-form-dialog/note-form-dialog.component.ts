import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { NoteService } from 'src/app/shared/service/agenda.service';

@Component({
  selector: 'app-note-form-dialog',
  templateUrl: './note-form-dialog.component.html',
  styleUrls: ['./note-form-dialog.component.scss']
})
export class NoteFormDialogComponent implements OnInit {

  editdata: any;

  constructor(
    private fb: FormBuilder,
    private rest: NoteService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.rest.idNotes(this.data.id).subscribe(response => {
        this.editdata = response;
        this.noteForm.patchValue({
          id: this.editdata.id,
          title: this.editdata.title,
          agendaBody: this.editdata.agendaBody,
          agendaDate: this.editdata.agendaDate,
          agendaTime: this.editdata.agendaTime
        });
      });
    }
  }

  noteForm = this.fb.group({
    id: this.fb.control({ value: '', disabled: true }),
    title: this.fb.control('', Validators.required),
    agendaBody: this.fb.control('', Validators.required),
    agendaDate: this.fb.control('', Validators.required),
    agendaTime: this.fb.control('', Validators.required),
  });

  saveNote() {
    if (this.noteForm.valid) {
      const Editid = this.noteForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        console.log('update sucessfully');
        alert("add the time")
        this.rest.updateNote(Editid, this.noteForm.getRawValue()).subscribe(response => {
          this.cancel();
          alert("update sucessfully")
          window.location.reload();
        });
      } else {
        console.log('saved sucessfully');
        const newDate = new Date(this.noteForm.value.agendaDate + 'T' + this.noteForm.value.agendaTime);
        this.noteForm.value.agendaDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss");
        console.log(this.noteForm.value);
        this.rest.postNotes(this.noteForm.value).subscribe(response => {
          this.cancel();
          alert("saved sucessfully")
          window.location.reload();
        });
      }
    }
  }

  cancel() {
    this.dialog.closeAll();
    console.log('dialog exit');
  }
}
