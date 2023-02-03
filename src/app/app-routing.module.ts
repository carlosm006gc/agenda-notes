import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CadastroComponent } from './views/user/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'cadastrar',
    component: CadastroComponent
  }
    
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
