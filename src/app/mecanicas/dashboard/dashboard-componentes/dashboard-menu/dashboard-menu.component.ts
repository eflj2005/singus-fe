import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';



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
  
  constructor(private router: Router, private ruta: ActivatedRoute) {
 



this.usuario = "Juan Bustos";

  this.menu  = [
    { opcion: 'Cargue1'                  , url:'/lista'                  , icon: "fa-file-archive-o"                 , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Cargue2'            , url: '/'+this.usuario+'/login'            , icon: "fa-file-archive-o"                 , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Cargue3'                  , url: '/'+this.usuario+'/clientes'                  , icon: "fa-file-archive-o"            , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Cargue4'       , url: '/'+this.usuario+'/empleados'                 , icon: "fa-file-archive-o"               , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Cargue5'          , url: '/'+this.usuario+'/tiposDocumentos'           , icon: "fa-file-archive-o"          , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Personas'                    , url: '/'+this.usuario+'/paises'                    , icon: "fa-pencil-square-o"                , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"        , orden: 2  },
    { opcion: 'Agendamientos'             , url: '/'+this.usuario+'/departamentos'             , icon: "fa-window-restore"                  , agrupamiento: "Actualización"     ,iconPrincipal:"fa-graduation-cap"        , orden: 2  },
    { opcion: 'Eventos'                  , url: '/'+this.usuario+'/ciudades'                  , icon: "fa-users"                  , agrupamiento: "Actividades"       ,iconPrincipal:"fa-suitcase"        , orden: 3  },
    { opcion: 'Comunicación'                    , url: '/'+this.usuario+'/cargos'                    , icon: ""        , agrupamiento: "Actividades"       ,iconPrincipal:"fa-suitcase"        , orden: 3  },
    { opcion: 'Alertas'            , url: '/'+this.usuario+'/especialidades'            , icon: ""       , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Informes'      , url: '/'+this.usuario+'/estadosDemandas'           , icon: ""                , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Perzonalizados'       , url: '/'+this.usuario+'/estadosProcesos'           , icon: ""                , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Informe dinamico'   , url: '/'+this.usuario+'/institucionesLaborales'    , icon: " "          , agrupamiento: "Informes"          ,iconPrincipal:"fa-file-text-o"        , orden: 4  },
    { opcion: 'Maestro'                  , url: '/'+this.usuario+'/juzgados'                  , icon: " "       , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"        , orden: 5  },
    { opcion: 'Usuario'               , url: '/'+this.usuario+'/parentesco'                , icon: ""               , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"        , orden: 5  },
    { opcion: 'Auditoria'         , url: '/'+this.usuario+'/tiposProcesos'             , icon: ""                , agrupamiento: "Administración"    ,iconPrincipal:"fa-user-circle-o"        , orden: 5  },
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
          console.log(grupo['opciones']);
        }
        
      }
      grupo['numeroOpciones'] = cantidad;
      this.nuevoMenu.push(grupo);  
     
    }
    
}

  
}
