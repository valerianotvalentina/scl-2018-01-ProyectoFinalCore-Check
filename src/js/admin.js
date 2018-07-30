var database = firebase.database();
const botonSave= document.getElementById("save");
const botonVerLista= document.getElementById("botonVisitantes")
const lista= document.getElementById("listaRegistro")

botonSave.addEventListener("click", event=>{
  let name= document.getElementById("name").value;
  let mail= document.getElementById("mail").value;
  var newPostRef = database.ref("/residentes/").push();
  newPostRef.set({
    name: name,
    mail: mail,
})
})


botonVerLista.addEventListener("click", event=>{
  database.ref('/registros/').on('child_added', function(snapshot){
  let name = snapshot.val().collaboratorName;
  let mail= snapshot.val().eMail;

  lista.innerHTML += `<div class= "visitante">
    <p>Nombre Visita: ${name}</p>
    <p>Mail Visita: ${mail}</p>
    </div>`    
  })
})

