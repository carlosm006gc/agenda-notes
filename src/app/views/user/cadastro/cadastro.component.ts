import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit{
  check: boolean = false;
  checkL: boolean = true;

  constructor(
  ) {}

  ngOnInit(): void {
    
  }

  showDiv(){
    this.check = !this.check;
    this.checkL = !this.checkL;
  }
  username = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('email') ? 'Not a valid email' : '';
  }
}
