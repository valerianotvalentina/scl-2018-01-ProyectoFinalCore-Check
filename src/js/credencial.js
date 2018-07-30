function getData(){ //Obtiene datos de Firebase con KEY
    let key = localStorage.getItem("registerKey");//Key proporcionada desde picture.js en almacenamiento local
    localStorage.removeItem("registerKey");//Impide reutilización, borrando del almacenamiento local la key
    firebase.database().ref(`registros/${key}`).once('value').then(function(user) {// Obtiene los datos de Firebase con key
        var qrcode = new QRCode(document.getElementById("userQR"), {// Crea objeto Qrcode en el div UserQR
            width : 120,//ancho del QR
            height : 120//alto del QR
        });
        document.getElementById('userName').innerText = user.val().userName;
        document.getElementById('imgUser').src = user.val().urlPicture;
        //qrcode.makeCode('{id:"' + key + '"}');//Genera QR json
        qrcode.makeCode(key);//Genera QR solo id
        document.getElementById('userDateTime').innerText = user.val().createTime;
        document.getElementById('notificado').innerText = 'Hemos notificado a '+ user.val().collaboratorName +' de tu visita. Espera que venga por ti.';
    });
}
getData();