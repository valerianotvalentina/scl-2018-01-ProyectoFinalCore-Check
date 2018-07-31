var database = firebase.database();
const botonSave = document.getElementById("save");
const botonVerLista = document.getElementById("botonVisitantes")
const lista = document.getElementById("listaVisitas")
const inputText = document.querySelector("input");
const boton = document.getElementById("boton");
const listaVisita = document.getElementById("ConteoVisitas");
const listaResidentes = document.getElementById("listaResidentes");
const botonListaResidentes = document.getElementById("botonResidentes")

//guardar nuevo residente
botonSave.addEventListener("click", event => {
  let name = document.getElementById("name").value;
  let mail = document.getElementById("mail").value;
  var newPostRef = database.ref("/residentes/").push();
  newPostRef.set({
    name: name,
    mail: mail,
  })
})

//lista registro visitas
botonVerLista.addEventListener("click", event => {
  lista.innerHTML= "";
  database.ref('/registros/').on('child_added', function (snapshot) {
    let visitante = snapshot.val().userName;
    let mail = snapshot.val().eMail;
    let fecha = snapshot.val().createTime;
    lista.innerHTML += `<div class= "visitante">
    <p>Nombre Visita: ${visitante}</p>
    <p>Mail: ${mail}</p>
    <p>Registrado el: ${fecha}</p>
    </div>`
  })
})
/* <p>Visita a: ${residente}</p>     let residente= snapshot.val().collaboratorName; */ 


//lista registro residentes
botonListaResidentes.addEventListener("click", event => {
  listaResidentes.innerHTML= "";
  database.ref('/residentes/').on('child_added', function (snapshot) {
    let residente = snapshot.val().name;
    listaResidentes.innerHTML += `<div class= "visitante">
    <p>Nombre Residente: ${residente}</p>    
    </div>`
  })
})


//input buscar visitas por residente
boton.addEventListener("click", event => {
  let nameResidente = document.getElementById("Residente").value;
  listaVisita.innerHTML = `<p>Las visitas que a recibido ${nameResidente} Son:</p>`
  database.ref('/registros/').on('child_added', function (snapshot) {
    let residente = snapshot.val().collaboratorName;
    let visitante = snapshot.val().userName;
    let fecha = snapshot.val().createTime;
    console.log(snapshot.val())
    if (residente.indexOf(nameResidente) != -1) {
      listaVisita.innerHTML +=
        `<div class= "visitante">   
    <p>${visitante} el ${fecha}</p> 
    </div>`
    }
  })
})

