import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {
    console.log("Http client enabled");
  }

  title = 'demo-ui';

  textValue = 'initial value';
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }

  log = '';

  logText(value: string): void {
    this.log += `Text changed to '${value}'\n`;
  }

  values = '';
  averageValue = '';
  keyedValue = '';


  onKey(event: any) { // without type info
    this.keyedValue = event.target.value;
    console.log("Keyed value :" + event.target.value);
    this.values += event.target.value + ' | ';
   
    this.http.get('http://localhost:8070/calculateAvg?number=' + event.target.value).subscribe(data => {
      this.averageValue = JSON.stringify(data);
    });

    this.keyedValue = ' ';

  }

  clear(){
    this.http.get('http://localhost:8070/clear?value=true').subscribe(data => {
    console.log("Clearing all numbers");

    }
    );

    this.averageValue= '';
    
  }

  value = '';
  array: any;

  onEnter(value: string) { 
    this.value = value;
    this.http.get('http://localhost:8070/getPrices?name=' + value).subscribe(data => {
      this.array= JSON.stringify(data).split(",");
      console.log(data);
    });
  }

  mouseLeave(div : string){
    console.log('mouse leave :' + div);
  }
  

  numberArray : any;

  inputValue = '';
  pressEnter(value: string) {
     this.value = value; 
  }

  clearMessages(){
  
    this.http.get('http://localhost:8070/deleteAll?command=clear').subscribe(data => {
      this.array= JSON.stringify(data).split(",");
      console.log(data);
    });
  }


}
