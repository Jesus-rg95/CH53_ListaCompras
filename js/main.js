let txtName = document.getElementById("Name"); ///Nombre
let txtNumber = document.getElementById("Number"); // cantidad
let btnAgregar = document.getElementById("btnAgregar");
let  alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let  alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos")
const productosTotal = document.getElementById("productosTotal")/////////
const precioTotal = document.getElementById("precioTotal")

//Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos =0;
let datos = new Array (); //Almacena los elementos

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN
    
    if(Number(txtNumber.value)<=0){
        return false;
    }// Mayor de 0

    return true;
}// validarCantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}//getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    //Bandera al ser true permite
    let isValid = true;

    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto.</strong";
        alertValidaciones.style.display="block";
        isValid = false;
    }//length>=3

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        alertValidacionesTexto.innerHTML +="<br/>=<strong>La cantidad no es correcta.</strong";
        alertValidaciones.style.display="block";
        isValid = false;
    }// validarCantidad

    if(isValid){ //si paso las validaciones
        cont++; // primera columna
        let precio = getPrecio();// ultima columna
        let row =  `<tr>
                     <td>${cont}</td>
                     <td>${txtName.value}</td>
                     <td>${txtNumber.value}</td>
                     <td>${precio}</td>
                    </tr>`;
        let elemento = {
                         "cont" : cont,
                         "nombre" : txtName.value,
                         "cantidad" : txtNumber.value,
                         "precio" : precio
                        };
        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));
 
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;
        let resumen = {
            "cont" : cont,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
          };
        localStorage.setItem("resuemen", JSON.stringify(resumen));
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isValid
}); //btnAgregar.addEventListener click

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }// datos !=null
    datos.forEach((d) => {
        let row = `<tr>
                   <td>${d.cont}</td>
                   <td>${d.nombre}</td>
                   <td>${d.cantidad}</td>
                   <td>${d.precio}</td>
                   </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }//// resumen !=null
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    productosTotal.innerText =totalEnProductos;
    contadorProductos.innerText = cont; 
});//window.addEventListener load


