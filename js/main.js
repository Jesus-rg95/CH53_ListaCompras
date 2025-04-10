let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let  alertValidacionesTexto = document.getElementById("")
let  alertValidaciones = document.getElementById("")

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto.</strong";
        alertValidaciones.style.display="block";

    }//len

});//btnAgregar


