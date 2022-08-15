import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'custom-time-picker';


  public hoursArray:Array<string> = new Array<string>();
  public minutesArray:Array<string> = new Array<string>();
  public meridian:string = "AM";

  public showBox:boolean = false;
  public selectedHours:string = "00";
  public selectedMinutes:string = "00";
  public selectedTime:string ="00:00";
  public selectedTimeForServer:string = "00:00";
  public wrongInput:boolean = false;
  // private timeValidationRegex:string = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$";
  private timeValidationRegex:string = "^([01][0-9]|2[0-3]):([0-5][0-9])$";


  @ViewChild('showHideTimeBox') showHideTimeBox!: ElementRef;
  @ViewChild('hoursTimeBox') hoursTimeBox!: ElementRef;
  @ViewChild('minutesTimeBox') minutesTimeBox!: ElementRef;


  constructor(private renderer:Renderer2) {

    /**
     * This events get called by all clicks on the page
     * This logic is to handle the clicks outside the timeBox div so that timeBox can hide/close if clicked outside of it.
     */
    this.renderer.listen('window','click',(e:Event) =>{

       if( e.target !== this.showHideTimeBox.nativeElement && !(this.hoursTimeBox && this.hoursTimeBox.nativeElement.toString().includes(e.target)) && !(this.minutesTimeBox && this.minutesTimeBox.nativeElement.toString().includes(e.target))){
        this.showBox = false;
      }
    });

  }

  ngOnInit(): void {

    for (let index = 0; index < 24; index++) {
      if(index < 10){
        this.hoursArray.push(`0${index}`);
      }else{
        this.hoursArray.push(`${index}`);
      }
    }

    for (let index = 0; index < 60; index++) {
      if(index < 10){
        this.minutesArray.push(`0${index}`);
      }else{
        this.minutesArray.push(`${index}`);
      }
    }

  }

  showHideBox(){
    this.showBox = !this.showBox;
  }

  clearTime(){
    this.selectedTime = "00:00";
  }

  selectHours(hours:string){
    if(hours){
      this.selectedHours = hours;
      this.selectedTime = `${this.selectedHours}:${this.selectedMinutes}`;
    }
  }

  selectMinutes(minutes:string){
    if(minutes){
      this.selectedMinutes = minutes;
      this.selectedTime = `${this.selectedHours}:${this.selectedMinutes}`;
    }
  }
  SetTime(){
    this.selectedTime = `${this.selectedHours}:${this.selectedMinutes}`;
    if(this.selectedTime.match(this.timeValidationRegex)){
      this.selectedTimeForServer = this.selectedTime;
      this.wrongInput = false;
    }else{
      this.wrongInput = true;
    }
    this.showBox = false;

  }

  validateTime(){
    if(this.selectedTime.match(this.timeValidationRegex)){
      this.selectedTimeForServer = this.selectedTime;
      this.wrongInput = false;
    }else{
      this.wrongInput = true;
      this.showBox = false;
    }
  }

}
