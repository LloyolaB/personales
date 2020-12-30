//Empieza el codigo nuevo distinto a jumpseller
//Esconder codigo postal y pais
$(document).ready(function(){
   // Esconder el Pais y codigo postal dentro del formulario
	$("#shipping_address_postal").hide();
  $("#shipping_address_country").hide();
});

  
$(document).ready(function(){
  //$("#order_customer_phone").attr("pattern","/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/");
  $("#order_customer_phone").attr("placeholder","+569XXXXXXXX");
  $("#order_customer_email").attr("placeholder","tucorreo@correo.com");
  $("#order_shipping_address_name").attr("placeholder","Ingresa tu Nombre...");
  $("#order_shipping_address_surname").attr("placeholder","Ingresa tu Apellido...");
  $("#order_shipping_address_address").attr("placeholder","Ingresa tu Dirección...");
  $("#order_shipping_address_taxid").attr("placeholder","Sin Puntos ni Guión...");
	$("#order_shipping_address_city").attr("placeholder","Ingresa tu Ciudad...");
  $("#order_other_additional_information").attr("placeholder","Ingresa aquí cualquier información relevante que quieras añadir...");
  $("#order_customer_accepts_marketing").attr("checked","checked");
 
  

});
// Validador de rut 
$(document).ready(function(){
  addRutValidator($('#order_shipping_address_taxid'));
  addRutValidatorForBillingAddress($('#order_billing_address_taxid'));
  $("#shipping_same_as_billing").on('change', function(evt) {
    addRutValidatorForBillingAddress($('#order_billing_address_taxid'));
  })
})
function addRutValidatorForBillingAddress(element) {
  if($("#shipping_same_as_billing:checked").val() == 1){
    element.prop('required', false);
    element.unbind('keyup', checkRut);
    $('#order_billing_address_municipality').prop('required', false);
  }
  else {
    $('#order_billing_address_municipality').prop('required', true);
    addRutValidator(element);
  }
}
function addRutValidator(element) {
  element.prop('required', true);
  element.bind('keyup', checkRut)
}
function checkRut(evt) {
    var rut = evt.currentTarget
    // remover puntos
    var value = rut.value.replace('.', '');
    // remover guion
    value = value.replace('-', '');
    // isolate rutBody and Dígito Verificador
    rutBody = value.slice(0, -1);
    digit = value.slice(-1).toUpperCase();
    // Formato RUN
    rut.value = rutBody + '-'+ digit;
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(rutBody.length < 7) {
      rut.setCustomValidity("RUT Incompleto Por favor Revísalo");
      return false;
    }
    // calcular digito verificador
    digitsSum = 0;
    multiplier = 2;
    // for each digit on rutBody
    for (i=1; i <= rutBody.length; i++) {
        // get product of corresponding multiplier
        index = multiplier * value.charAt(rutBody.length - i);
        // add digt sum to counter
        digitsSum = digitsSum + index;
        if (multiplier < 7) {
          multiplier = multiplier + 1;
        } else {
          multiplier = 2;
        }
    }
    // calculate digitVerifier on base module 11
    digitVerifier = 11 - (digitsSum % 11);
    // special cases (0 and K)
    digit = (digit == 'K')?10:digit;
    digit = (digit == 0)?11:digit;
    // validtes rutBody with his digit
    if(digitVerifier != digit) {
      rut.setCustomValidity("RUT Inválido Por Favor Revísalo");
      return false;
    }
    rut.setCustomValidity('');
}

