import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  tipoMenu: number=0;

  usuario:any = null;
  // urlUsuario:any=this.ruta.paramMap.subscribe(
  //     ( params: ParamMap ) : void => {
  //       this.urlUsuario = params.get( "usuario" );
  //       // console.log('v'+valor);
  //       // this.urlUsuario = valor;
  //       console.log(this.urlUsuario);
  //     }
  //   );

  //opciones del menu con nombre y url
  menu:any;
  
  nuevoMenu:Array<Object> = [];

  gruposMenu: Array<Object> = [];

  searchObject={
    agrupamiento:"",
  }

  constructor() {
    // if(servicioSesion.ProcesarToken() != false) {
   if(false == false) {
      this.usuario = "Administrador";

      let tipoUsuario = "Abogado";

      if(tipoUsuario == "Abogado"){
        this.menu = [
          { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                        , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Cambiar Contraseña'        , url: '/'+this.usuario+'/editarClave'                               , agrupamiento: "Usuarios"         , orden: 4  }
        ];
      }

      if(tipoUsuario == "Administrador"){
        this.menu = [
          { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                           , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Procesador PDF'            , url: '/'+this.usuario+'/convertidorPdf'                      , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Clientes'                  , url: '/'+this.usuario+'/clientes'                              , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Empleados y Usarios'       , url: '/'+this.usuario+'/empleados'                              , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Tipos Documentos'          , url: '/'+this.usuario+'/tiposDocumentos'                     , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Paises'                    , url: '/'+this.usuario+'/paises'                                  , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Departamentos'             , url: '/'+this.usuario+'/departamentos'                              , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Ciudades'                  , url: '/'+this.usuario+'/ciudades'                                 , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Cargos'                    , url: '/'+this.usuario+'/cargos'                           , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Especialidades'            , url: '/'+this.usuario+'/especialidades'                  , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados de la Demana'      , url: '/'+this.usuario+'/estadosDemandas'                      , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados del Proceso'       , url: '/'+this.usuario+'/estadosProcesos'                          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Instituciones Laborales'   , url: '/'+this.usuario+'/institucionesLaborales'           , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Juzgados'                  , url: '/'+this.usuario+'/juzgados'                       , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Parentescos'               , url: '/'+this.usuario+'/parentesco'                               , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Procesos'         , url: '/'+this.usuario+'/tiposProcesos'                           , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Demanda'          , url: '/'+this.usuario+'/tipoDemandas'                          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Cambiar Contraseña'        , url: '/'+this.usuario+'/editarClave'                                 , agrupamiento: "Usuarios"         , orden: 4  }
        ];
      }

      if(tipoUsuario == "Recepcionista"){
        this.menu = [
          { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                           , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Procesador PDF'            , url: '/'+this.usuario+'/convertidorPdf'                      , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Clientes'                  , url: '/'+this.usuario+'/clientes'                            , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Empleados y Usarios'       , url: '/'+this.usuario+'/empleados'                            , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Tipos Documentos'          , url: '/'+this.usuario+'/tiposDocumentos'                    , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Paises'                    , url: '/'+this.usuario+'/paises'                                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Departamentos'             , url: '/'+this.usuario+'/departamentos'                              , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Ciudades'                  , url: '/'+this.usuario+'/ciudades'                                   , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados de la Demana'      , url: '/'+this.usuario+'/estadosDemandas'                           , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados del Proceso'       , url: '/'+this.usuario+'/estadosProcesos'                           , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Instituciones Laborales'   , url: '/'+this.usuario+'/institucionesLaborales'             , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Juzgados'                  , url: '/'+this.usuario+'/juzgados'                        , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Parentescos'               , url: '/'+this.usuario+'/parentesco'                              , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Procesos'         , url: '/'+this.usuario+'/tiposProcesos'                             , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Demanda'          , url: '/'+this.usuario+'/tipoDemandas'                          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Cambiar Contraseña'        , url: '/'+this.usuario+'/editarClave'                               , agrupamiento: "Usuarios"         , orden: 4  }
        ];
      }

    }

    var menuActual="";
    for (var unmenu of this.menu) {
      if(menuActual != unmenu.agrupamiento){
        this.gruposMenu.push({nombre: unmenu.agrupamiento, orden: unmenu.orden, opciones: [] });
        menuActual = unmenu.agrupamiento;
      }
    }

    for (var grupo of this.gruposMenu) {
      
      
      for(var opcion of this.menu){
        if(grupo['orden'] == opcion['orden']){
          grupo['opciones'].push(opcion);
        }
        
      }
      this.nuevoMenu.push(grupo);  
    }

    //console.log(this.nuevoMenu);


  }


  ngOnInit() {
  }

  //muestra o culta el menu cuando la pantalla es pequeña
  cambio() { 
    if(this.tipoMenu==0){
      this.tipoMenu = 1;
    }
    else{
      this.tipoMenu = 0;
    }
  }



  // cerrarSesion(){
  //   this.servicioSesion.CerrarSesion();
  // }
}
