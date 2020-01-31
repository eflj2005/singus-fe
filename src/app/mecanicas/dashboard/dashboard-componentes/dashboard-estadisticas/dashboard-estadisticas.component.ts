import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions ,  ChartType} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard-estadisticas',
  templateUrl: './dashboard-estadisticas.component.html',
  styleUrls: ['./dashboard-estadisticas.component.css']
})
export class DashboardEstadisticasComponent implements OnInit {

  datos: any = [
    {
      codigo: 1, 
      descripcion:'Graduados por Cohorte',
      tabla:{
        cabecera: [ "", "201610", "201660", "201710", "201760", "201810", "201860", "Total"],
        cuerpo:[
          [ 'Graduados', 690, 440, 538, 502, 432, 461, 556 ]
        ],
        pie: [ 'Total', 69, 64, 138, 92, 132, 61, 556 ]
      },      
      torta: {
        descripcion:["Nivel de Satisfacción General"],        
        etiquetas:[ "201610", "201660", "201710", "201760", "201810", "201860"],
        datos:[  69, 64, 138, 92, 132, 61],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción por cohorte"],
        etiquetas:["201610", "201660", "201710", "201760", "201810", "201860"],
        datos:[
          { data:[ 69, 64, 138, 92, 132, 61 ],  label:'Graduados'  }        
        ],
      }
    },
    { 
      codigo: 2, 
      descripcion:'¿Nivel de satisfacion con la calidad de formacion integral recibida (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","Ibagué", "Lerida", "Fresno", "Dorada", "Puerto Boyaca","Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 15, 27, 20, 50, 16,128],
          [ 'Insatisfecho',     20,  19, 42, 12, 33,126],
          [ 'Satisfecho',       402, 305, 135, 260, 150,1252],
          [ 'Muy Satisfecho',   200, 102, 393, 215, 146,1056],
        ],
        pie: [ 'Total', 637, 453, 590, 537,345,2562]
      },      
      torta: {
        descripcion:["Nivel genreral de satisfacción"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 128, 126, 1252, 1056],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion por sedes"],
        etiquetas:["Ibagué", "Lerida", "Fresno", "Dorada", "Puerto Boyaca"],
        datos:[
          { data:[ 15, 27, 20, 50, 16],  label:'Muy Insatisfecho'  },
          { data:[ 20,  19, 42, 12, 33 ],  label:'Insatisfecho'      },
          { data:[ 402, 305, 135, 260, 150 ],   label:'Satisfecho'        },
          { data:[ 200, 102, 393, 215, 146 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      codigo: 3, 
      descripcion:'¿Nivel de satisfacion con la disponibilidad de tiempo de los profesores (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo","Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 8,   15,  12, 21,  20,  30,  18,  20,  144 ],
          [ 'Insatisfecho',     20,  13,  10, 12,  15,  10,  25,  38,  143 ],
          [ 'Satisfecho',       102, 205, 89, 125, 115, 135, 148, 150, 1069 ],
          [ 'Muy Satisfecho',   111, 70,  56, 200, 330, 145, 172, 116, 1200 ],
        ],
        pie: [ 'Total', 241, 303, 167, 358, 480, 320, 363, 324, 2556 ]
      },      
      torta: {
        descripcion:["Nivel general de satisfacción "],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[144,143,1069,1200],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción por programas"],
        etiquetas:["Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo"],
        datos:[
          { data:[ 8,   15,  12, 21,  20,  30,  18,  20 ],  label:'Muy Insatisfecho'  },
          { data:[ 20,  13,  10, 12,  15,  10,  25,  38 ],  label:'Insatisfecho'      },
          { data:[ 102, 205, 89, 125, 115, 135, 148, 150 ],   label:'Satisfecho'        },
          { data:[ 111, 70,  56, 200, 330, 145, 172, 116 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      codigo: 4, 
      descripcion:'¿Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","201610", "201660", "201710", "201760", "201810", "201860", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 25,  17,  23,  12,  20,  73,  170 ],
          [ 'Insatisfecho',     7,   23,  17,  43,  32,  47,  169 ],
          [ 'Satisfecho',       120, 220, 212, 145, 78,  82,  857 ],
          [ 'Muy Satisfecho',   240, 325, 122, 134, 212, 328, 1361 ],
        ],
        pie: [ 'Total', 392, 585, 374, 334, 342, 530, 2557 ]
      },      
      torta: {
        descripcion:["Nivel de satisfaccion general"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 83, 109, 156, 161],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción por cohortes"],
        etiquetas:["201610", "201660", "201710", "201760", "201810", "201860"],
        datos:[
          { data:[ 25,  17,  23,  12,  20,  73 ],  label:'Muy Insatisfecho'  },
          { data:[ 7,   23,  17,  43,  32,  47 ],  label:'Insatisfecho'      },
          { data:[ 120, 220, 212, 145, 78,  82 ],   label:'Satisfecho'        },
          { data:[ 240, 325, 122, 134, 212, 328 ],  label:'Muy Satisfecho'    },        
        ],
      }
    }
  ]

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
