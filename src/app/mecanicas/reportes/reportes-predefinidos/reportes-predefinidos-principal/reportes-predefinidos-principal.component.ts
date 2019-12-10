import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';

interface Cohorte { 
  Id:number,
  Nombre:number,
  Seleccionado: boolean} 

interface Programas { 
  Id:number,
  Nombre:string,
  Seleccionado: boolean} 

interface Sedes { 
  Id:number,
  Nombre:string,
  Seleccionado: boolean} 

@Component({
  selector: 'app-reportes-predefinidos-principal',
  templateUrl: './reportes-predefinidos-principal.component.html',
  styleUrls: ['./reportes-predefinidos-principal.component.css']
})
export class ReportesPredefinidosPrincipalComponent implements OnInit {

  public escalaPdf = 0.48;

  cohortes: Array<Cohorte> = [
    { Id:1, Nombre:201965,  Seleccionado: false },
    { Id:2, Nombre:201935,  Seleccionado: false },
    { Id:3, Nombre:201974,  Seleccionado: false },
    { Id:4, Nombre:201945,  Seleccionado: false },
    { Id:5, Nombre:201862,  Seleccionado: false }
  ];

  programas: Array<Programas> = [ 
    {  Id:1,  Nombre:'Agronomia, Veterinaria y afines',   Seleccionado: false },
    {  Id:2,  Nombre:"Bellas artes",                      Seleccionado: false },
    {  Id:3,  Nombre:"Ciencias de la educación",          Seleccionado: false },
    {  Id:4,  Nombre:'Ciencias de la salud',              Seleccionado: false },
    {  Id:5,  Nombre:'Matematicas y ciencias naturales',  Seleccionado: false }
  ];

  sedes: Array<Sedes> = [ 
    { Id:1, Nombre:'Ibagué',        Seleccionado: false },
    { Id:2, Nombre:"Puerto Boyaca", Seleccionado: false },
    { Id:3, Nombre:"Fresno",        Seleccionado: false },
    { Id:4, Nombre:'Cajamarca',     Seleccionado: false },
    { Id:5, Nombre:'Líbano',        Seleccionado: false }
  ];
  
  datos: any = [
    { 
      descripcion:'¿Nivel de satisfacion con su institucion (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 3,  7,  15, 18, 8,  11, 62 ],
          [ 'Insatisfecho',     10, 13, 23, 8,  22, 15, 91  ],
          [ 'Satisfecho',       26, 18, 44, 22, 15, 3,  128 ],
          [ 'Muy Satisfecho',   30, 26, 56, 44, 87, 32, 275 ],
        ],
        pie: [ 'Total', 69, 64, 138, 92, 132, 61, 556 ]
      },      
      torta: {
        descripcion:["Nivel de Satisfacción General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 62, 91, 128, 275],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 3,  7,  15, 18, 8,  11 ],  label:'Muy Insatisfecho'  },
          { data:[ 10, 13, 23, 8,  22, 14 ],  label:'Insatisfecho'      },
          { data:[ 26, 18, 44, 22, 15, 3 ],   label:'Satisfecho'        },
          { data:[ 30, 26, 56, 44, 87, 32 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
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
      descripcion:'¿Nivel de satisfacion con la disponibilidad de tiempo de los profesores (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo","Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 8, 15, 12, 21, 20, 30, 18, 20 ,2 ],
          [ 'Insatisfecho',     30, 13, 10, 24, 15, 20, 112, 8,2 ],
          [ 'Satisfecho',       20, 18, 25, 10, 30, 35,  138, 8 ,2 ],
          [ 'Muy Satisfecho',   15, 32, 40, 15, 25, 45, 172, 8,2 ],
        ],
        pie: [ 'Total', 105, 90, 90, 85, 90, 110, 570,8,2 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 148, 112, 138, 172],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 40, 27, 15, 36, 20, 10 ],  label:'Muy Insatisfecho'  },
          { data:[ 30, 13, 10, 24, 15, 20 ],  label:'Insatisfecho'      },
          { data:[ 20, 18, 25, 10, 30, 35 ],   label:'Satisfecho'        },
          { data:[ 15, 32, 40, 15, 25, 45 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 3,  7,  23, 17, 20, 13, 83 ],
          [ 'Insatisfecho',     7,  23, 27, 13, 22, 17, 109  ],
          [ 'Satisfecho',       30, 20, 20, 26, 28, 32, 156 ],
          [ 'Muy Satisfecho',   40, 25, 22, 34, 12, 28, 161 ],
        ],
        pie: [ 'Total', 80, 75, 92, 90, 82, 90, 509 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 83, 109, 156, 161],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 3,  7,  23, 17, 20, 13 ],  label:'Muy Insatisfecho'  },
          { data:[ 7,  23, 27, 13, 22, 17 ],  label:'Insatisfecho'      },
          { data:[ 30, 20, 20, 26, 28, 32 ],   label:'Satisfecho'        },
          { data:[ 40, 25, 22, 34, 12, 28 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con las relaciones interpersonales con la comunidad institucional (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 40, 30, 25, 35, 50, 30,  210 ],
          [ 'Insatisfecho',     30, 25, 12, 18, 30, 20,  135 ],
          [ 'Satisfecho',       14, 10, 15, 20, 8,   3,  70 ],
          [ 'Muy Satisfecho',    3,  7, 9, 18, 5,  11,   62 ],
        ],
        pie: [ 'Total', 87, 72, 61, 91, 93, 64, 477 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 210, 135, 70, 62],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 40, 30, 25, 35, 50, 30 ],  label:'Muy Insatisfecho'  },
          { data:[ 30, 25, 12, 18, 30, 20 ],  label:'Insatisfecho'      },
          { data:[ 14, 10, 15, 20, 8,   3 ],   label:'Satisfecho'        },
          { data:[ 3,  7, 9, 18, 5,  11 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Existe un balance entre las actividades extracurriculares y académicas?',
      tabla:{
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Si',  250, 10, 30,   20,   25, 15,  350 ],
          [ 'No',  120, 470, 420, 379,  245, 376, 2010 ]
        ],
        pie: [ 'Total', 370, 480, 450, 399, 270, 391, 2360 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Si','No'],
        datos:[ 350, 2010],
        colores:[{ backgroundColor:['rgba(0,255,0,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 250, 10, 30,   20,   25, 15 ],  label:'Si'  },
          { data:[ 120, 470, 420, 379,  245, 376 ],  label:'No'      }       
        ],
      }
    },
  ]
 
  




  seleccion: any;

  datosEstadistica: any = []


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

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },    
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      labels: [
        { render: 'value', position: 'outside', fontSize: 10 },
      ],      
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };


  constructor() {
    console.log(this.datos);
   }

  ngOnInit() {


  }


crear(reporte){
  switch (reporte) {
    case 1:

      break;
  
    default:
      break;
  }
}



ExportToPdf(){

}



}

