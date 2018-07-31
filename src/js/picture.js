const constraints = {
    video: true
  };
  const video = document.getElementById('Video');
  const captureVideoButton =  document.getElementById('btnCaptura');
  const screenshotButton = document.getElementById('capturePicture');
  const enableVideo = document.getElementById('enableVideo');
  const img = document.getElementById('imgFoto');
  const canvas = document.createElement('canvas');

  let register = JSON.parse(localStorage.getItem("register"));
  localStorage.removeItem("register");
  console.log(register);

  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
  
  img.style.display = 'none';
  enableVideo.style.display = 'none';

  enableVideo.onclick = function() {
    video.style.display = 'block';
    screenshotButton.style.display = 'block';
    img.style.display = 'none';
    enableVideo.style.display = 'none';    
  }

  screenshotButton.onclick = function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
      
      video.style.display = 'none';
      screenshotButton.style.display = 'none';
      img.style.display = 'block';
      enableVideo.style.display = 'block';
  };

  function handleSuccess(stream) {
      screenshotButton.disabled = false;
      video.srcObject = stream;
  }

  function handleError(error) {
      console.error('Error: ', error);
  }

  function dataURLtoBlob(dataurl) {
    console.log(dataurl);

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    console.log('Enviando foto');
    return new Blob([u8arr], {type:mime});
  }

    function savePhoto(){
        console.log("boton guardar");
        let newRegistroKey = firebase.database().ref().child('registros').push().key;
        subirArchivo(dataURLtoBlob(img.src), newRegistroKey + '.jpg', newRegistroKey);
        
    }

  function subirArchivo(archivo, nombre, key) {
    console.log('Subir Archivo');
    console.log(archivo);
    console.log(nombre);
    let storageService = firebase.storage();
    // creo una referencia al lugar donde guardaremos el archivo
    let refStorage = storageService.ref('userImages').child(nombre);
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
function saveData(urlPicture , key){
    console.log('saveData');
    console.log(urlPicture);
    firebase.database().ref(`registros/${key}`).set({
        userName : register.userName,
        rutUser : register.rutUser,
        eMail : register.eMail,
        enterpriseFrom : register.enterpriseFrom,
        patenteUser : register.patenteUser,
        urlPicture : urlPicture,
        collaboratorName : register.collaboratorName,
        collaboratorEmail : register.collaboratorEmail,
        createTime: register.createTime,
        reasonVisit : register.reasonVisit
    }, function(error){
       
       //aqui deberia ir el envio a correo.
       localStorage.setItem('registerKey',key);
       sendMail(register, urlPicture)
       
       //sendMail(user);
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





