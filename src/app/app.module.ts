import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NoteListComponent } from './views/home/note-list/note-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LocalDateTimePipe } from './shared/pipe/local-date-time.pipe';
import { NoteFormDialogComponent } from './views/home/note-form-dialog/note-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CadastroComponent } from './views/user/cadastro/cadastro.component';
import { InfoPageComponent } from './views/info-page/info-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoteListComponent,
    LocalDateTimePipe,
    NoteFormDialogComponent,
    CadastroComponent,
    InfoPageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
