import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, IonCard, IonButton, IonCardContent, IonItem, IonCardHeader, IonInput, ] 
})
export class LoginPage {
  username: string = 'admin';
  password: string = '1234';

  constructor(private router: Router) { }

  Login() {
    if (this.username === 'admin' && this.password === '1234') {
      console.log('Login exitoso, dirigiendo a calculadora');
      this.router.navigate(['/calcu']);
    } else {
      alert("Error: Usuario o contraseña incorrectos");
      console.log('Login fallido, permaneciendo en login');
    }
  }

}
