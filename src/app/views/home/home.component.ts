import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteFormDialogComponent } from './note-form-dialog/note-form-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  router: Router;
  route: ActivatedRoute;
  constructor(
    public dialog: MatDialog
  ){}

  ngOnInit(): void {

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
}
