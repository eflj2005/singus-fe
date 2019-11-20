import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { AutenticacionService } from '@app/servicios/autenticacion.service';



@Component({
  selector: 'dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  //opciones del menu con nombre y url
  menu:any;
  usuario:any;
  tipoMenu: number=0;
  nuevoMenu:Array<Object> = [];

  gruposMenu: Array<Object> = [];

  searchObject={
    agrupamiento:"",
  }
  
  constructor(private rutas: Router, private ruta: ActivatedRoute, private autenticador: AutenticacionService) {
 



this.usuario = "Juan Bustos";

  this.menu  = [ 
    { opcion: 'Cargue1'           , url:'/lista'                      , icon: "fa-download"                , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
    { opcion: 'Cargue2'           , url: '/cambiar'                   , icon: "fa-cloud-download"          , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
    { opcion: 'Cargue3'           , url: '/clientes'                  , icon: "fa-file"                    , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
    { opcion: 'Cargue4'           , url: '/empleados'                 , icon: "fa-stack-overflow"          , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
    { opcion: 'Cargue5'           , url: '/tiposDocumentos'           , icon: "fa-files-o"                 , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
    { opcion: 'Personas'          , url: '/lista'                     , icon: "fa-pencil-square-o"         , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },
    { opcion: 'Agendamientos'     , url: '/agendamiento'              , icon: "fa-window-restore"          , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },
    { opcion: 'Eventos'           , url: '/ciudades'                  , icon: "fa-users"                   , agrupamiento: "Actividades"       ,iconPrincipal:"fa-suitcase"           , orden: 3  },
    { opcion: 'Comunicación'      , url: '/cargos'                    , icon: "fa-envelope"                , agrupamiento: "Actividades"       ,iconPrincipal:"fa-suitcase"           , orden: 3  },
    { opcion: 'Alertas'           , url: '/especialidades'            , icon: "fa-exclamation-circle"      , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Informes'          , url: '/estadosDemandas'           , icon: "fa-file-pdf-o"              , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Perzonalizados'    , url: '/estadosProcesos'           , icon: "fa-file-code-o"             , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Informe dinamico'  , url: '/institucionesLaborales'    , icon: "fa-file-excel-o"            , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Maestro'           , url: '/juzgados'                  , icon: "fa-share-alt-square"        , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
    { opcion: 'Usuario'           , url: '/parentesco'                , icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
    { opcion: 'Auditoria'         , url: '/tiposProcesos'             , icon: "fa-bar-chart "              , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
  ];

  var menuActual : string;
    for (var unmenu of this.menu) {
      if(menuActual != unmenu.agrupamiento){
        this.gruposMenu.push({nombre: unmenu.agrupamiento, orden: unmenu.orden, numeroOpciones: 0, opciones: [],icono:unmenu.icon,iconoP: unmenu.iconPrincipal });
        menuActual = unmenu.agrupamiento; 

      }
    }

    for (var grupo of this.gruposMenu) {
      let cantidad=0;
      
      for(var opcion of this.menu){
        if(grupo['orden'] == opcion['orden']){
          grupo['opciones'].push(opcion);
          cantidad++;
         
        }
        
      }
      grupo['numeroOpciones'] = cantidad;
      this.nuevoMenu.push(grupo);  
     
    }
    
}

  CerrarSesion(){
    this.autenticador.CerrarSesion();
    this.RecargarComponente();

  }

  RecargarComponente(){
    this.rutas.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.rutas.url + '?';
  
    this.rutas.navigateByUrl(currentUrl).then(() => {
      this.rutas.navigated = false;
      this.rutas.navigate([this.rutas.url]);
    });
  }
}
