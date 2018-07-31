function logoutWithFirebase() {	
	localStorage.removeItem("user") 	
	firebase.auth().signOut()
		.then(() => {
      console.log("Usuario finalizó su sesión");
      window.location="../../index.html"
		})
		.catch((error) => {
			console.log("Error de firebase > Código > " + error.code);
			console.log("Error de firebase > Mensaje > " + error.message);
		});
}