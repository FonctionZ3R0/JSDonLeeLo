document.getElementById("demo").innerHTML = "Entrez la chaîne de caractères à transformer en QR Code : ";
var qr;
(function() {
    qr = new QRious({
        element: document.getElementById('qr_code'),
        size: 225,
        value: 'https://www.adultswim.com/',
    });
    console.log(qr.value);
    document.getElementById("qr_result").innerHTML = "<u><a href="+qr.value+">" + qr.value +"</u>";
})();

function genererQRCode() {

    var qrtext = document.getElementById("qr_txt").value;
    console.log(qrtext)   ;
    document.getElementById("qr_result").innerHTML = "<u><a href=http://"+qrtext+">" + qrtext +"</u>";
    var modalB = document.getElementById("mod")
    modalB.style.display = "block";
    modalB.innerHTML = "QR Code Généré !<br><br><u>" + qrtext +"</u><br><br><a href='#' rel='modal:close'>Close</a>";
    qr.set({
        foreground: 'black',
        size: 225,
        value: qrtext
    });
}

var qrtxt = document.getElementById("qr_txt")
qrtxt.addEventListener("keyup", function(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter")     
      document.getElementById("qr_btn").click();
  })

var modal = document.getElementById("mod");
var closeMod = document.getElementById("modalClose");
modal.addEventListener("click", function(event) {    
    modal.style.display = "none";
  })
