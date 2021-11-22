function listado (){
    return {
        lista: null,
        listar: function () {

            fetch("http://localhost:8000/api/Ventas/listar/", {
                method: 'get',

                headers: { "Content-type": "application/json;charset=UTF-8" }
            })
                .then(res => res.json())
                .then(json => {
                    this.lista = json.data;

                    console.log(lista);

                })
                .catch(err => console.log(err));
        },
        seleccionar: function(id){
            console.log( id );

            localStorage.setItem('IdVenta', id);

            window.open("./ventas.html", "_self");

            
        }
    }

}