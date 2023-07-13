import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format, parseISO } from 'date-fns';
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
    if (this.data.id && this.data.id !== '') {
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

  noteForm: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    title: ['', Validators.required],
    agendaBody: ['', Validators.required],
    agendaDate: ['', Validators.required],
    agendaTime: ['', Validators.required]
  });

  saveNote() {
    if (this.noteForm.valid) {
      const Editid = this.noteForm.getRawValue().id;
      if (Editid) {
        console.log('update successfully');
        alert("add the time");
        console.log('Editid:', Editid);
        console.log('Raw Form Value:', this.noteForm.getRawValue());
        this.rest.updateNote(Editid, this.noteForm.getRawValue()).subscribe(response => {
          this.cancel();
          alert("update successfully");
          window.location.reload();
        });
      } else {
        console.log('saved successfully');
        const agendaDateStr = format(this.noteForm.value.agendaDate, 'yyyy-MM-dd');
        const agendaTimeStr = this.noteForm.value.agendaTime;
        console.log('agendaDateStr:', agendaDateStr);
        console.log('agendaTimeStr:', agendaTimeStr);
  
        const [agendaHour, agendaMinute] = agendaTimeStr.split(':');
  
        const newDateTime = new Date(
          Number(agendaDateStr.substr(0, 4)),
          Number(agendaDateStr.substr(5, 2)) - 1, // Mês é baseado em zero
          Number(agendaDateStr.substr(8, 2)),
          Number(agendaHour),
          Number(agendaMinute)
        );
  
        console.log('New DateTime:', newDateTime);
        this.noteForm.value.agendaDate = format(newDateTime, "yyyy-MM-dd'T'HH:mm:ss");
        console.log('Updated Form Value:', this.noteForm.value);
        this.rest.postNotes(this.noteForm.value).subscribe(response => {
          this.cancel();
          alert("saved successfully");
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
