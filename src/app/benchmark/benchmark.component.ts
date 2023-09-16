import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css']
})
export class BenchmarkComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

  }

  onSubmit(count: string) {
    console.log(count);
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval: any;

    const timer = document.getElementById('timer');

    startTime = Date.now() - elapsedTime

    timerInterval = setInterval( ()=> {
      elapsedTime = Date.now() - startTime
      // @ts-ignore
      timer.textContent = this.formatTimer(elapsedTime);
    }, 10)

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });

    let response = this.http.post('http://localhost:8080',
      Number(count),
      {headers:reqHeader, responseType: 'text'});

    response.subscribe(() => {
      clearInterval(timerInterval);
    })
  }

  formatTimer(elapsedTime:any){
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const mseconds = Math.floor((elapsedTime % 1000) / 10);
    return (
      (hours ? (hours > 9 ? hours : "0" + hours) : "00")
      + ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
      + ":" +
      (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00")
      + "." +
      (mseconds > 9 ? mseconds : "0" + mseconds));
  }
}
