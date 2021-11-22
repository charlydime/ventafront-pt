function detalle() {
    
    return {
        Idventa: 1,
        producto: '',
        detalle:{
            Id_Detalle: 3 ,
            IdVenta: 1,
            IdProducto: 2,
            cantidad : 1,
            subtotal: 1
        },
        nuevoDetalle: {
            Id_Detalle: null,
            IdVenta: null,
            IdProducto: null,
            cantidad: null,
            subtotal: null
        },
        lista: null,
        inicializa: function () { 
            //this.venta  = localStorage.getItem('venta');
            //this.Id_Detalle = 3;
            //this.carga();
            //this.IdVenta = 1;
            
            this.IdVenta = localStorage.getItem('IdVenta');
            this.listar();
            

            localStorage.removeItem('IdVenta');
         },
         nuevoProducto: function(){
             console.log("nuevoProd");
             this.detalle = this.nuevoDetalle;
             this.detalle.IdProducto = '' ;
             this.producto = '';
         },
        carga: function () {

            fetch("http://localhost:8000/api/Detalle/" + this.Id_Detalle, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this.detalle = json.data[0];
                    this.producto = json.data[0].producto.nombre;
                })
                .catch(err => console.log(err));

            console.log(this.detalle.Id_Produccion);

        },
        guardar: function () {

            data = {
                Id_Detalle: this.detalle.Id_Detalle,
                IdVenta: this.detalle.IdVenta,
                Id_Producto: this.detalle.IdProducto,
                cantidad: this.detalle.cantidad,
                subtotal: this.detalle.subtotal,
                IdCliente: this.detalle.IdCliente
            };
            if (this.detalle.Id_Detalle == null) {

                fetch("http://localhost:8000/api/Detalle/", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { "Content-type": "application/json;charset=UTF-8" }
                })
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);
                        this.detalle = json.data;
                        //this.nombre = json.data[0].cliente.nombre;

                    })
                    .catch(err => console.log(err));

            } else {
                fetch("http://localhost:8000/api/Detalle/" + this.detalle.Id_Detalle, {
                    method: 'PUT',
                    body: JSON.stringify(this.detalle),
                    headers: { "Content-type": "application/json;charset=UTF-8" }
                })
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);
                        this.detalle = json.data[0];
                        this.producto = json.data[0].producto.nombre;

                    })
                    .catch(err => console.log(err));
            }
        },
        borrar: function (id) {

            if (confirm('Deseas borra el registro de detalle?'))
                fetch("http://localhost:8000/api/Detalle/" + id , {
                    method: 'DELETE',
                })
                    .then(res => {
                        this.nuevoProducto();
                        console.log(res);
                        this.listar();

                    })
                    .catch(err => console.log(err));

        },
        editar: function(det){
            
            this.detalle.Id_Detalle = det.Id_Detalle;
            this.detalle.IdVenta = det.IdVenta;
            this.detalle.cantidad = det.cantidad;
            this.detalle.subtotal = det.subtotal;
            this.detalle.IdProducto = det.producto;


        },
        listar: function(){
            


            fetch("http://localhost:8000/api/Detalle/listar/"+this.IdVenta, {
                method: 'get',
                
                headers: { "Content-type": "application/json;charset=UTF-8" }
            })
            .then(res => res.json())
            .then(json => {
                this.lista = json.data;
                
                console.log(lista);

            })
            .catch(err => console.log(err));
        }
    }
}