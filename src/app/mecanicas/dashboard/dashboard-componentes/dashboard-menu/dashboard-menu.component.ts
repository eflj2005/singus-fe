import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { AutenticacionService } from '@servicios/autenticacion.service';
import {AmbienteService} from '@servicios/ambiente.service';



@Component({
  selector: 'dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  //opciones del menu con nombre y url
  menu:any;
  tipoMenu: number=0;
  nuevoMenu:Array<Object> = [];

  gruposMenu: Array<Object> = [];

  searchObject={
    agrupamiento:"",
  }
  
  constructor(
    private rutas: Router, 
    private ruta: ActivatedRoute, 
    private autenticador: AutenticacionService,
    private servicioAmbiente : AmbienteService
  )
  {
 
    console.log ( this.autenticador.UsuarioActualValor  ) ;


    switch( this.autenticador.UsuarioActualValor.rol ){
      case "D":

        this.menu  = [ 
          { opcion: 'Argos'               , url: '/cargue'                , parametros: '1'   ,  icon: "fa-download"                , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
          { opcion: 'SAP'                 , url: '/cargue'                , parametros: '2'   ,  icon: "fa-cloud-download"          , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
          { opcion: 'Micrositio'          , url: '/cargue'                , parametros: '3'   ,  icon: "fa-file"                    , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
          { opcion: 'Empleabilidad'       , url: '/cargue'                , parametros: '4'   ,  icon: "fa-stack-overflow"          , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
          { opcion: 'Emprendimiento'      , url: '/cargue'                , parametros: '5'   ,  icon: "fa-files-o"                 , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"            , orden: 1  },
          { opcion: 'Personas'            , url: '/personas'              , parametros: null  ,  icon: "fa-pencil-square-o"         , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },
          { opcion: 'Agendamientos'       , url: '/agendamiento'          , parametros: null  ,  icon: "fa-window-restore"          , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },
          { opcion: 'Subagendamientos'    , url: '/subagendamiento'       , parametros: null  ,  icon: "fa-sitemap"                 , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },          
          { opcion: 'Eventos'             , url: '/eventos'               , parametros: null  ,  icon: "fa-users"                   , agrupamiento: "Actividades"       ,iconPrincipal:"fa-suitcase"           , orden: 3  },
          { opcion: 'Comunicación'        , url: '/cargos'                , parametros: null  ,  icon: "fa-envelope"                , agrupamiento: "Actividades"       ,iconPrincipal:"fa-suitcase"           , orden: 3  },
          { opcion: 'Alertas'             , url: '/alertas'               , parametros: null  ,  icon: "fa-exclamation-circle"      , agrupamiento: "Reportes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
          { opcion: 'Predefinidos'        , url: '/predefinidos'          , parametros: null  ,  icon: "fa-file-pdf-o"              , agrupamiento: "Reportes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
          { opcion: 'Perzonalizados'      , url: '/estadosProcesos'       , parametros: null  ,  icon: "fa-file-code-o"             , agrupamiento: "Reportes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
          { opcion: 'Maestras'            , url: '/maestras'              , parametros: null  ,  icon: "fa-share-alt-square"        , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
          { opcion: 'Usuario'             , url: '/usuarios/lista'        , parametros: null  ,  icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
          { opcion: 'Cambiar Clave'       , url: '/usuarios/cambiarclave' , parametros: null  ,  icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },    
          { opcion: 'Auditoria'           , url: '/tiposProcesos'         , parametros: null  ,  icon: "fa-bar-chart "              , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
        ];

      break;
      case "A":

        this.menu  = [ 
          { opcion: 'Personas'          , url: '/personas'               , parametros: null ,  icon: "fa-pencil-square-o"         , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },
          { opcion: 'Agendamientos'     , url: '/agendamiento'           , parametros: null ,  icon: "fa-window-restore"          , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },          
          { opcion: 'Subagendamientos'  , url: '/subagendamiento'        , parametros: null ,  icon: "fa-sitemap"                 , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },                    
          { opcion: 'Alertas'           , url: '/alertas'                , parametros: null ,  icon: "fa-exclamation-circle"      , agrupamiento: "Reportes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
          { opcion: 'Maestras'          , url: '/maestras'               , parametros: null ,  icon: "fa-share-alt-square"        , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
          { opcion: 'Usuario'           , url: '/usuarios/lista'         , parametros: null ,  icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },
          { opcion: 'Cambiar Clave'     , url: '/usuarios/cambiarclave'  , parametros: null ,  icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },    
        ];
      
      break;
      case "C":
        this.menu  = [ 
          { opcion: 'Subagendamientos'   , url: '/subagendamiento'        , parametros: null ,   icon: "fa-sitemap"                 , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },                    
          { opcion: 'Cambiar Clave'     , url: '/usuarios/cambiarclave'   , parametros: null ,   icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },              
        ];        

      break;
      case "O":


        this.menu  = [ 
          { opcion: 'Personas'          , url: '/personas'                , parametros: null ,   icon: "fa-pencil-square-o"         , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },
          { opcion: 'Subagendamientos'   , url: '/subagendamiento'        , parametros: null ,   icon: "fa-sitemap"                 , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"     , orden: 2  },                    
          { opcion: 'Cambiar Clave'     , url: '/usuarios/cambiarclave'   , parametros: null ,   icon: "fa-user-circle-o "          , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"      , orden: 5  },    
        ];


      break;
    }
  
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
  }

  RecargarComponente(){
    this.rutas.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.rutas.url + '?';
  
    this.rutas.navigateByUrl(currentUrl).then(() => {
      this.rutas.navigated = false;
      this.rutas.navigate([this.rutas.url]);
    });
  }

  Reiniciar(){
    this.servicioAmbiente.controlMecanicasPersonas.modo = 1;
    this.servicioAmbiente.agendaModo.modo = 1
  }

}
