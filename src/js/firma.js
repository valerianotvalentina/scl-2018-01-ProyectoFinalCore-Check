let register = JSON.parse(localStorage.getItem("register"));
localStorage.removeItem("register");
console.log(register);

const canvas = document.getElementById("Draw");
const ctx = canvas.getContext("2d");
let cw = canvas.width = 300,
cx = cw / 2;
let ch = canvas.height = 200,
cy = ch / 2;

let dibujar = false;
ctx.lineJoin = "round";
// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
    let mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    let rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

canvas.addEventListener('mousedown', drawDown, false);
canvas.addEventListener('mouseup',drawUp, false);
canvas.addEventListener("mouseout",drawOut, false);
canvas.addEventListener("mousemove",drawMove, false);

function drawDown(evt){
    dibujar = true;
    ctx.beginPath();
}
function drawUp(evt){
    dibujar = false;
}
function drawOut(evt){
    dibujar = false;
}
function drawMove(evt){
    if (dibujar) {
        let m = oMousePos(canvas, evt);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
    } 
}


function oMousePos(canvas, evt) {
    let ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }  
}      
function clearDraw(){
    ctx.clearRect(0, 0, cw, ch);
}
function saveDraw(){
    console.log('Grabar firma');
    var image = canvas.toDataURL("image/png");
    subirArchivo(dataURLtoBlob(canvas.toDataURL("image/png")), register.key + '.png', register.key);
}

function subirArchivo(archivo, nombre, key) {
    console.log('Subir Archivo');
    console.log(archivo);
    console.log(nombre);
    let storageService = firebase.storage();
    // creo una referencia al lugar donde guardaremos el archivo
    let refStorage = storageService.ref('userSigning').child(nombre);
    // Comienzo la tarea de upload
    const uploadTask = refStorage.put(archivo);
    // defino un evento para saber qué pasa con ese upload iniciado
    uploadTask.on('state_changed', null,
        function(error){
            console.log('Error al subir el archivo', error);
        },
        function(){
            //obtiene la url de la imagen recien subida
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //cambia el source de la imagen por la url de la imagen recien subida
                console.log('Listo, quedo en :' + downloadURL + ' y la key ' + key);
                
                saveData(downloadURL,key);
              });
        }
    );
}



function saveData(urlSigning , key){
    console.log('saveData');
    console.log(urlSigning);
    firebase.database().ref(`registros/${key}`).set({
        userName : register.userName,
        rutUser : register.rutUser,
        eMail : register.eMail,
        enterpriseFrom : register.enterpriseFrom,
        patenteUser : register.patenteUser,
        urlSigning : urlSigning,
        urlPicture : register.urlPicture,
        collaboratorName : register.collaboratorName,
        collaboratorEmail : register.collaboratorEmail,
        createTime: register.createTime,
        reasonVisit : register.reasonVisit
    }, function(error){
       //aqui deberia ir el envio a correo.
       localStorage.setItem('registerKey',key);
       sendMail(register, register.urlPicture)
   }); 

}


function sendMail(user, imgPath){//se encarga de enviar el correo
    let params = {
        user_id: 'user_NcXfoiOxLJgnHnL05ujzH',
        service_id: 'gmailloreto',
        template_id: 'credencial',
        template_params: {//parametros para el template de emailjs
            'toMail': register.collaboratorEmail,
            'ccMail': register.eMail,
            'username': register.collaboratorName,
            'visitaName':register.userName,
            'imgPath':imgPath
        }
    };
 
    let headers = {//para que envie la solicitud como un json
        "Content-type": "application/json"
    };
 
    let options = {//opciones de envio para emailjs
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };
 
    fetch('https://api.emailjs.com/api/v1.0/email/send', options)
        .then((httpResponse) => {
            if (httpResponse.ok) {
                window.location = 'credencial.html';//si se envia correctamente el email,redirecciona a la credencial.
                console.log('El e-mail se envio');
            } else {
                return httpResponse.text()
                    .then(text => Promise.reject(text));
            }
        })
        .catch((error) => {
            console.log('Oops... no se pudo enviar:' + error);
        });     


}


