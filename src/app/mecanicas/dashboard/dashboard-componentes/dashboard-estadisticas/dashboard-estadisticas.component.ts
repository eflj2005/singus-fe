import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions ,  ChartType} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard-estadisticas',
  templateUrl: './dashboard-estadisticas.component.html',
  styleUrls: ['./dashboard-estadisticas.component.css']
})
export class DashboardEstadisticasComponent implements OnInit {

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      labels: [
        { render: 'percentage', position: 'outside' },
        { render: 'value' }
      ],
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = [['Plataforma'], ['Encuesta'], 'Eventos'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sede A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Sede B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Sede C'}
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febreno', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() { }

  ngOnInit() {
  }

}
