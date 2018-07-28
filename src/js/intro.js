    window.onload = timeout;

    function timeout() {
        window.setTimeout("redirect()", 1500)
    }

    function redirect() {
        window.location = "src/html/registro.html"
        return
    }