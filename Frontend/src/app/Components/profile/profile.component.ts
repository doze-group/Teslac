import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  ctx;

  constructor() { }

  ngOnInit() {
    this.ctx = (document.getElementById('Chart') as HTMLCanvasElement).getContext('2d');
    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
          datasets: [{
              label: 'Actividad',
              data: [12, 19, 3, 5, 2, 3, 0],
          }]
      },
  });
  }

}
