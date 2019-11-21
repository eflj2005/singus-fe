import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AmbienteService } from '@app/servicios/ambiente.service';
import { map } from 'rxjs/operators';

export interface filtroInterface{
    [key: string]: string | boolean | number;
}

export class GenericoModel {
  protected nombreTabla:string;

  protected posicionActual:number = null;
  protected cantidad:number = null;

  protected registros:any[] = []

  constructor(
    protected llamadoHttp :HttpClient,
    protected datosAmbiente: AmbienteService
  ) {}

  public CargarDesdeDB( filtrosRecibidos:filtroInterface ): Observable<any> {
  
    let re1 = /\"/gi;
    let re2 = /{/gi;
    let re3 = /\}/gi;    
    
    let datosEnviados = new HttpParams()
      .set("accion","obtener_registros")
      .set("tabla",this.nombreTabla)
      .set("filtros", JSON.stringify(filtrosRecibidos).replace(re1, "").replace(re2, "").replace(re3, ""));

      console.log(datosEnviados);
    return this.llamadoHttp.get<any>( this.datosAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: any) => {

          

          return respuesta;
        }
      )
    );

  }

  public AsignarAtributo( nombreAtributo:String, valorAtributo:any ){
    this.registros[this.posicionActual].nombreAtributo = valorAtributo;
  }

  public ObtenerAtributo( nombreAtributo:String ){
    return this.registros[this.posicionActual].nombreAtributo;
  }

  public ObtenerRegistroActual(){
    return  this.registros[this.posicionActual];
  }

  public AgregarRegistro(objeto:any){
    this.registros.push(objeto);
    this.cantidad++;
  }

  public MoverInicio(){
    this.posicionActual = 0;
  }

  public MoveFinal(){
    this.posicionActual = this.cantidad - 1;
  }

  public MoverSiguiente(){
    this.posicionActual++;
  }

}
