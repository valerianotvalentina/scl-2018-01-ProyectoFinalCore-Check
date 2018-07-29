const constraints = {
    video: true
  };
  const video = document.getElementById('Video');
  const captureVideoButton =  document.getElementById('btnCaptura');
  const screenshotButton = document.getElementById('capturePicture');
  const enableVideo = document.getElementById('enableVideo');
  const img = document.getElementById('imgFoto');
  const canvas = document.createElement('canvas');

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


  function subirArchivo(archivo, nombre) {
    let storageService = firebase.storage();
    // creo una referencia al lugar donde guardaremos el archivo
    let refStorage = storageService.ref('userImages').child(currentUser.uid + archivo.name);
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
                //document.getElementById('imgReview').src = downloadURL;
                console.log()
              });
        }
    );
}

