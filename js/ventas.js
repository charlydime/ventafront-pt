function ventas() {
    return{
        Id_Venta: 0,
        nombre: '',
        venta:{
            Id_Venta: 1,
            fecha: Date.now(),
            iva: 100,
            descuento: 50,
            total: 200,
            IdCliente: 1
        },
        nuevaVenta: {
            Id_Venta: null,
            fecha: null ,
            iva: null,
            descuento: null,
            total: null,
            IdCliente: null
        },
        inicializa:function(){
           // localStorage.setItem('venta', JSON.stringify(this.nuevaVenta) )
        this.Id_Venta = localStorage.getItem('IdVenta');
        this.carga();

          
        },
        hacerVenta: function () {
            console.log("hacerven");
            var date = new Date();
            var currentDate = date.toISOString().substring(0, 10);
            this.venta = this.nuevaVenta;
            this.venta.fecha = currentDate;
            this.venta.IdCliente = '';
            this.nombre = '';
            console.log(this.venta);
        },
        carga:function(){

             fetch("http://localhost:8000/api/Ventas/" + this.Id_Venta, {
                 method: 'GET',
             })
            .then( res =>  res.json() )
            .then( json => {
                console.log(json);
                this.venta = json.data[0];
                this.nombre = json.data[0].cliente.nombre;
            } ) 
            .catch( err => console.log(err));
                
                console.log(this.venta.Id_Venta);

         },
         guardar:function(){

             data = {
                 Id_Venta: this.venta.Id_Venta,
                 fecha: this.venta.fecha,
                 iva: this.venta.iva,
                 descuento: this.venta.descuento,
                 total: this.venta.total,
                 IdCliente: this.venta.IdCliente
             };
             if (this.venta.Id_Venta == null){

                 fetch("http://localhost:8000/api/Ventas/" , {
                     method: 'POST',
                     body : JSON.stringify (data),
                     headers: { "Content-type": "application/json;charset=UTF-8" }
                 })
                     .then(res => res.json())
                     .then(json => {
                         console.log(json);
                         this.venta = json.data;
                         //this.nombre = json.data[0].cliente.nombre;
                        
                        })
                     .catch(err => console.log(err));

             }else{
                 fetch("http://localhost:8000/api/Ventas/" + this.venta.Id_Venta, {
                     method: 'PUT',
                     body: JSON.stringify(this.venta),
                     headers: { "Content-type": "application/json;charset=UTF-8" }
                 })
                     .then(res => res.json())
                     .then(json => {
                         console.log(json);
                         this.venta = json.data[0];
                         this.nombre = json.data[0].cliente.nombre;

                     })
                     .catch(err => console.log(err));
             }
         },
         borrar:function(){

            if ( confirm('Deseas borra el registro de venta?') ) 
                fetch("http://localhost:8000/api/Ventas/" + this.venta.Id_Venta, {
                    method: 'DELETE',
                })
                    .then(res =>{
                        this.hacerVenta();
                        console.log(res);

                    } )
                    .catch(err => console.log(err));

         }

         

    }
}