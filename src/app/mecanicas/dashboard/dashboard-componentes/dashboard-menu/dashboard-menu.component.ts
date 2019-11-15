import { Component, OnInit } from '@angular/core';


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
  
  constructor() {
 



this.usuario = "Juan Bustos";

  this.menu  = [
    { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                  , icon: "fa-home"                 , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Procesador PDF'            , url: '/'+this.usuario+'/convertidorPdf'            , icon: "fa-home"                 , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Clientes'                  , url: '/'+this.usuario+'/clientes'                  , icon: "fa-id-card-o"            , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Empleados y Usarios'       , url: '/'+this.usuario+'/empleados'                 , icon: "fa-user-o"               , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Tipos Documentos'          , url: '/'+this.usuario+'/tiposDocumentos'           , icon: "fa-file-text-o"          , agrupamiento: "Cargue Masivo"     ,iconPrincipal:"fa-wpforms"        , orden: 1  },
    { opcion: 'Paises'                    , url: '/'+this.usuario+'/paises'                    , icon: "fa-plane"                , agrupamiento: "Actualización"     ,iconPrincipal:"fa-wpforms"        , orden: 2  },
    { opcion: 'Departamentos'             , url: '/'+this.usuario+'/departamentos'             , icon: "fa-bus"                  , agrupamiento: "Actualización"     ,iconPrincipal:"fa-wpforms"        , orden: 2  },
    { opcion: 'Ciudades'                  , url: '/'+this.usuario+'/ciudades'                  , icon: "fa-car"                  , agrupamiento: "Actividades"       ,iconPrincipal:"fa-wpforms"        , orden: 3  },
    { opcion: 'Cargos'                    , url: '/'+this.usuario+'/cargos'                    , icon: "fa-user-circle-o"        , agrupamiento: "Actividades"       ,iconPrincipal:"fa-wpforms"        , orden: 3  },
    { opcion: 'Especialidades'            , url: '/'+this.usuario+'/especialidades'            , icon: "fa-graduation-cap"       , agrupamiento: "Informes"          ,iconPrincipal:"fa-wpforms"        , orden: 4  },
    { opcion: 'Estados de la Demana'      , url: '/'+this.usuario+'/estadosDemandas'           , icon: "fa-gavel"                , agrupamiento: "Informes"          ,iconPrincipal:"fa-wpforms"        , orden: 4  },
    { opcion: 'Estados del Proceso'       , url: '/'+this.usuario+'/estadosProcesos'           , icon: "fa-tasks"                , agrupamiento: "Informes"          ,iconPrincipal:"fa-wpforms"        , orden: 4  },
    { opcion: 'Instituciones Laborales'   , url: '/'+this.usuario+'/institucionesLaborales'    , icon: "fa-university "          , agrupamiento: "Informes"          ,iconPrincipal:"fa-wpforms"        , orden: 4  },
    { opcion: 'Juzgados'                  , url: '/'+this.usuario+'/juzgados'                  , icon: "fa-balance-scale "       , agrupamiento: "Administración"    ,iconPrincipal:"fa-wpforms"        , orden: 5  },
    { opcion: 'Parentescos'               , url: '/'+this.usuario+'/parentesco'                , icon: "fa-child "               , agrupamiento: "Administración"    ,iconPrincipal:"fa-wpforms"        , orden: 5  },
    { opcion: 'Tipos de Procesos'         , url: '/'+this.usuario+'/tiposProcesos'             , icon: "fa-clone"                , agrupamiento: "Administración"    ,iconPrincipal:"fa-wpforms"        , orden: 5  },
  ];
  var menuActual="";
    for (var unmenu of this.menu) {
      if(menuActual != unmenu.agrupamiento){
        this.gruposMenu.push({nombre: unmenu.agrupamiento, orden: unmenu.orden, opciones: [],icono:unmenu.icon });
        menuActual = unmenu.agrupamiento;
        console.log(menuActual);
      }
    }

    for (var grupo of this.gruposMenu) {
      
      
      for(var opcion of this.menu){
        if(grupo['orden'] == opcion['orden']){
          grupo['opciones'].push(opcion);
        }
        
      }
      this.nuevoMenu.push(grupo);  
      console.log(this.nuevoMenu);
    }
    
}
cambio() { 
  if(this.tipoMenu==0){
    this.tipoMenu = 1;
  }
  else{
    this.tipoMenu = 0;
  }
}
  
}
