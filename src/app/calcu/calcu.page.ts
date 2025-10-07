import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, 
  IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonLabel,
  IonRouterLink
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-calcu',
  templateUrl: './calcu.page.html',
  styleUrls: ['./calcu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, 
    IonCardHeader, IonItem, IonInput,IonButton, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonLabel, IonRouterLink]
})

export class CalcuPage {
  display: string = '0';
  currentValue: number = 0;
  previousValue: number = 0;
  operator: string = '';
  waitingForNewValue: boolean = false;

  constructor(private router: Router) {}

  addNumber(num: string) {
    if (this.waitingForNewValue) {
      this.display = num;
      this.waitingForNewValue = false;
    } else {
      this.display = this.display === '0' ? num : this.display + num;
    }
    this.currentValue = parseFloat(this.display);
  }


  addDecimal() {
    if (this.waitingForNewValue) {
      this.display = '0.';
      this.waitingForNewValue = false;
      return;
    }

    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  setOperator(op: string) {
    if (this.operator && !this.waitingForNewValue) {
      this.calculate();
    }
    this.previousValue = parseFloat(this.display);
    this.operator = op;
    this.waitingForNewValue = true;
  }


  calculate() {
    const current = parseFloat(this.display);
    let result: number;

    if (this.operator === '^') {
      result = Math.pow(this.previousValue, current);
    } else if (this.operator === '+') {
      result = this.previousValue + current;
    } else if (this.operator === '-') {
      result = this.previousValue - current;
    } else if (this.operator === '*') {
      result = this.previousValue * current;
    } else if (this.operator === '/') {
      result = this.previousValue / current;
    } else {
      result = current;
    }

    this.display = this.formatResult(result);
    this.currentValue = result;
    this.operator = '';
    this.waitingForNewValue = true;
  }

 
  scientificFunction(func: string) {
    const value = parseFloat(this.display);
    let result: number;

    switch (func) {
      case 'square':
        result = Math.pow(value, 2);
        break;
      case 'cube':
        result = Math.pow(value, 3);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'cbrt':
        result = Math.cbrt(value);
        break;
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case 'factorial':
        result = this.factorial(value);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case 'power10':
        result = Math.pow(10, value);
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      case 'floor':
        result = Math.floor(value);
        break;
      case 'ceil':
        result = Math.ceil(value);
        break;
      case 'round':
        result = Math.round(value);
        break;
      default:
        return;
    }

    this.display = this.formatResult(result);
    this.currentValue = result;
    this.waitingForNewValue = true;
  }


  factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  formatResult(value: number): string {
    if (isNaN(value) || !isFinite(value)) {
      return 'Error';
    }
    
    if (value.toString().length > 12) {
      return value.toExponential(6);
    }
    return value.toString();
  }

 
  clear() {
    this.display = '0';
    this.currentValue = 0;
    this.previousValue = 0;
    this.operator = '';
    this.waitingForNewValue = false;
  }


  backspace() {
    if (this.display.length > 1 && this.display !== 'Error') {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
    }
    this.currentValue = parseFloat(this.display);
  }


  toggleSign() {
    if (this.display !== 'Error') {
      this.currentValue = -parseFloat(this.display);
      this.display = this.currentValue.toString();
    }
  }

  percentage() {
    if (this.display !== 'Error') {
      this.currentValue = parseFloat(this.display) / 100;
      this.display = this.currentValue.toString();
    }
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
}

