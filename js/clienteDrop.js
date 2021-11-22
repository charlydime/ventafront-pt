function dropCliente(){
    return{
        optionsVisible: false,
        search: "",
        selected: {
            Id_Cliente: "",
            nombre: "",
            
        },
        options: [],
        filteredOptions(){
            return this.options.filter(
                option => {
                    return option.nombre.includes(this.search)
                }
            )
        },
        inicializa(){
            fetch("http://localhost:8000/api/Cliente/activos", {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this.options = json.data; 
                })
                .catch(err => console.log(err));

        }

        

    }


}