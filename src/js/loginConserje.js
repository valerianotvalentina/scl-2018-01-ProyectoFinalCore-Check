function loginWithFirebase() {
	const emailValue = email.value;
	const passwordValue = password.value;

	firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
		.then(() => {
			let user = firebase.auth().currentUser;
			localStorage.setItem("user", JSON.stringify(user));
			console.log("Usuario inició sesión con éxito");
			window.location = "admin.html"

		})
	.catch((error) => {
			let msn = document.getElementById("msnUsuario");
			if (error.code === "auth/user-not-found") {
				msn.innerHTML = "<span class='error'>Usuario no registrado</span>";
			}
			if (error.code === "auth/invalid-email") {
				msn.innerHTML = "<span class='error'>Correo electrónico no válido</span>";
			}

			if (error.code === "auth/wrong-password") {
				msn.innerHTML = "<span class='error'>Contraseña incorrecta</span>"
			}
			console.log("Error de firebase > Código > " + error.code);
			console.log("Error de firebase > Mensaje > " + error.message);
		}); 
}
