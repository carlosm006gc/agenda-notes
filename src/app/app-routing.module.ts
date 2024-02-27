import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { InfoPageComponent } from './views/info-page/info-page.component';

const routes: Routes = [
  { path: '', component: InfoPageComponent },
  { path: 'home', component: HomeComponent }, 
  { path: '**', redirectTo: '' } 
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
