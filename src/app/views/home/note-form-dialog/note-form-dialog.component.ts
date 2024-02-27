import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.id && this.data.id !== '') {
      this.rest.idNotes(this.data.id).subscribe((response: any) => {
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
        this.rest.updateNote(Editid, this.noteForm.getRawValue()).subscribe((response: any) => {
          this.cancel();
          alert("update successfully");
          this.refreshPage();
        });
      } else {
        const agendaDateStr = format(this.noteForm.value.agendaDate, 'yyyy-MM-dd');
        const agendaTimeStr = this.noteForm.value.agendaTime;

        const [agendaHour, agendaMinute] = agendaTimeStr.split(':');

        const newDateTime = new Date(
          Number(agendaDateStr.substr(0, 4)),
          Number(agendaDateStr.substr(5, 2)) - 1,
          Number(agendaDateStr.substr(8, 2)),
          Number(agendaHour),
          Number(agendaMinute)
        );

        this.noteForm.value.agendaDate = format(newDateTime, "yyyy-MM-dd'T'HH:mm:ss");
        this.rest.postNotes(this.noteForm.value).subscribe((response: any) => {
          this.cancel();
          alert("saved successfully");
          this.refreshPage();
        });
      }
    }
  }

  cancel() {
    this.dialog.closeAll();
    console.log('dialog exit');
  }

  private refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
