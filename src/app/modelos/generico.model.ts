export class GenericoModel {
    protected nombreTabla:string;

    protected posicionActual:number = null;
    protected cantidad:number = null;

    protected registros:any[] = []

    constructor(){
        //this.nombreTabla= GenericoModel.name;
    }

    public CargarFromDB(){
        
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
