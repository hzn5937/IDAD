//tip button (register form)//
function showTipWin () {
    var tipWindow = $("#tipWindow")                                     
    var scrnOverlay = $("#scrnOverlay")
    tipWindow.css('display', 'block')                           // styled with class="window" -> initially invisible//
    scrnOverlay.css('visibility', 'visible')                    // initially invisible//
}
function hideTipWin () {
    var tipWindow = $("#tipWindow")
    var scrnOverlay = $("#scrnOverlay")
    tipWindow.css('display', 'none')
    scrnOverlay.css('visibility', 'hidden')
}










function regvalidate () {
    //input//
    var customerName = $("#customerName").val()
    var userName = $("#userName").val()
    var password = $("#password").val()
    var passwordCf = $("#passwordConfirm").val()
    var eMail = $("#eMail").val()
    var phoneNumber = $("#phoneNumber").val()


    //utilities//
    var errorMsg = "";
    var result = true;
    var lowercase = /[a-z]/                          
    var uppercase = /[A-Z]/
    var specialCharacter = /[-@!%$*?&#^()_=+;:'".,<>`~]/        //pattern for special character (may not be all of them)//
    var number = /[0-9]/
    var wordcount = /^(?=.*\d).{8,}$/                           //at least 8 characters//
    var fullPasswordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/; //to overview full password pattern//

    if (customerName == ""){                                    //replace required attribute//
        errorMsg += "<li>Customer name cannot be empty.</li>"
    }
    if (customerName.match(number) || customerName.match(specialCharacter)) {       //cannot complete the form when customer name contain numbers or special characters//
        errorMsg += "<li>Customer name must only contain alphabet letters.</li>"
    }
    if (userName == ""){                                        //replace required attribute//
        errorMsg += "<li>Username cannot be empty. </li>"
    }
    if (userName.match(specialCharacter)) {
        errorMsg += "<li> Username must not contain special characters.</li>"   
    }
    if (password == "" || passwordConfirm == ""){
        errorMsg += "<li>Password cannot be empty. </li>"
    }
    if (!password.match(lowercase)) {                                //specify which parts of password pattern is missing//
        errorMsg += "<li>Password must contain at least 1 lowercase letter.</li>"
    }
    if (!password.match(uppercase)) {                                //specify which parts of password pattern is missing//               
        errorMsg += "<li>Password must contain at least 1 uppercase letter.</li>"
    }
    if (!password.match(number)) {                                   //specify which parts of password pattern is missing//       
        errorMsg += "<li>Password must contain at least 1 number.</li>"
    }
    if (!password.match(wordcount)) {                                //specify which parts of password pattern is missing//
        errorMsg += "<li>Password must contain at least 8 characters.</li>"
    }
    if (password.match(specialCharacter)) {                          //specify which parts of password pattern is missing//       
        errorMsg += "<li>Password must not contain special characters.</li>"
    }
    if (password != passwordCf) {
        errorMsg += "<li>Passwords do not match.</li>"
    }
    if (eMail.indexOf('@') == 0 ) {
		errorMsg += "<li>Email cannot start with an @ symbol.</li>";
	}
	if (eMail.indexOf('@') < 0 ) {
		errorMsg += "<li>Email must contain an @ symbol.</li>";
	}
    if (phoneNumber == ""){
        errorMsg += "<li>Phone number cannot be empty.</li>"
    }
    if (!phoneNumber.match(number)) {
        errorMsg += "<li>Phone number must only contain numbers.</li>"
    }
    //submiting//
    var numOfItems = ((errorMsg.match(/<li>/g)).length + 6);

    if (errorMsg != "") {                                                      //if errorMsg not empty//
		errorMsg = "<div class='overlay' id='errorScrnOverlay'></div>"+        //errorMsg create screen overlay and a window for inline message//  
		"<section id='errorWindow' class='window'><ul>"+
		errorMsg +
		"</ul><a href='#' id='errorClose' class='button'>Close</a></section>"
		$("body").after(errorMsg);
		$("#errorScrnOverlay").css('visibility', 'visible');                   //add the screen overlay//
		$("#errorWindow").css('height', numOfItems.toString() + 'em');         //more errorMsg more height//
		$("#errorWindow").css('margin-top', (numOfItems/-2).toString +'em')    
		$("#errorWindow").show();                                              //add window//
		$("#errorClose").click (function() {
			$("#errorScrnOverlay").remove();                                   //remove the screen overlay//
			$("#errorWindow").remove();                                        //remove window//
		}	);
		result = false;
    }
    return result;
}










    //show password value//
function passwordShowToggle() {
    var password = $("#password")
    var passwordCf = $("#passwordConfirm")
    var pwdShowTxt = $("#pwdShowTxt")
    if($(this).is(':checked')){                              /* when tick the box */
        password.attr("type","text");                        /*password type attribute = text*/
        pwdShowTxt.text('Hide');                             /* html text 'show' turn into 'hide' */
        passwordCf.attr('type','text')                       /* the same for password confirm section */
    }
    else {                                                   /* untick the box */
        password.attr("type","password");                    /*password type attribute = password*/
        passwordCf.attr("type","password");                  /* html text 'show' turn into 'hide' */
        pwdShowTxt.text('Show')
    }
}










function fillingAddress () {
    var bAddress = $("#bAddress")
    var dAddress = $("#dAddress")

    if($(this).is(':checked')){                     /* when tick the box */
        bAddress.val(dAddress.val())                /* billing address value = delivery address value */
    }
    else{                                           /* untick the box */
        bAddress.val("")                            /*billing address = none */
    }
}










function toggleDeliveryAddress () {
    var dAddress = $("#dAddress")
    var pickup = $("#pickup");
    var dupAddressBtn = $("#dupAddressBtn")

    if(pickup.is(':checked')){                              //select pickup option//
        dAddress.attr('readonly', true)                     //'readonly' attribute of delivery address stay the same or turn back on//
        dAddress.css('opacity', '0.1')                      // decrease opacity to look like the input has been disabled//
        dAddress.val("skip if select pickup option")        // Announce user to skip //
        dupAddressBtn.attr('disabled', true)                // disable the duplicate address button (if enable and clicked -> Billing Address ="skip if select pickup option")// 
    }
    else{
        dAddress.attr('readonly', false)                    //turn off 'readonly' attribute for delivery address//
        dAddress.css('opacity', '1')                        // increase opcaity to look like the input has been re-enable//
        dAddress.val("")                                    // remove the input value ("skip if select pickup option")//
        dupAddressBtn.attr('disabled', false)               // enable the duplicate address button

    }
}










function togglePayment () {
    var online = $("#online")
    var cardType = $("#cardType")
    var none = $("#none")
    var ccNumber = $("#ccNumber")
    var expDate = $("#expDate")
    var postcode = $("#postcode")
    var cvc = $("#cvc")
     

    if(online.is(':checked')){                               //if pay online is selected//
        cardType.attr('disabled', false)                     //enable credit card type//
        cardType.css('opacity', "1")                         //enable appearance//
        cardType.val("X")                                    //initial value = "Payment Options" -> select specific type for specific credit card placeholder. initial placeholder = none//
        none.attr('disabled', false)                         //enable the value "Payment Option"//                 
    }
    else {                                                   //if Cash is selected//
        $("#ccNumber").attr('placeholder', '')               //Clear placeholder for credit card number//
        none.attr('disabled', true)                          //disable the value "payment option" -> not validate//
        cardType.attr('disabled', true)                      //disable card type options//
        cardType.css('opacity', "0.1")                       //disable appearance//
        cardType.val("X")                                    //card type value = "payment options"
        ccNumber.attr('readonly', true)                      //enable readonly for credit card number//
        expDate.attr('readonly', true)                       //enable readonly for expiration date//
        postcode.attr('readonly', true)                      //enable readonly for postcode//
        cvc.attr('readonly', true)                           //enable readonly for cvc//
        ccNumber.css('opacity', '0.1')                       //disable appearance//  
        expDate.css('opacity', '0.1')
        postcode.css('opacity', '0.1')
        cvc.css('opacity', '0.1')
    }
}










function adaptiveCreditCard () {
    var visa = $("#visa").prop("selected")
    var mastercard = $("#mastercard").prop("selected")
    var aExpress = $("#aExpress").prop("selected")
    var ccNumber = $("#ccNumber")
    var expDate = $("#expDate")
    var postcode = $("#postcode")
    var cvc = $("#cvc")
    result = true ;


    if ((visa) || (mastercard)){                                    //when Visa OR Mastercard is selected//
        $("#ccNumber").attr('placeholder', '1234 1234 1234 1234')   //change credit card number placeholder (announce rules to fill)//        
        ccNumber.attr('readonly', false)                            //turn off readonly//
        expDate.attr('readonly', false)
        postcode.attr('readonly', false)
        cvc.attr('readonly', false)
        ccNumber.css('opacity', '1')                                //enable appearance//
        expDate.css('opacity', '1')
        postcode.css('opacity', '1')
        cvc.css('opacity', '1')
    }
    else if (aExpress) {                                            //when American Express is selected//
        $("#ccNumber").attr('placeholder', '1234 123456 12345')     //change credit card number placeholder (announce rules to fill)//
        ccNumber.attr('readonly', false)                            //turn off readonly//
        expDate.attr('readonly', false)
        postcode.attr('readonly', false)
        cvc.attr('readonly', false)
        cvc.attr('readonly', false)
        ccNumber.css('opacity', '1')
        expDate.css('opacity', '1')                                 //enable appearance//
        postcode.css('opacity', '1')
        cvc.css('opacity', '1') 
    }
    else {                                                          //select value "Payment Options"
        $("#ccNumber").attr('placeholder', '')                      //Clear placeholder//
        ccNumber.attr('readonly', true)                             //turn on readonly//
        expDate.attr('readonly', true)
        postcode.attr('readonly', true)
        cvc.attr('readonly', true)
        ccNumber.css('opacity', '0.1')                              //disable appearance//
        expDate.css('opacity', '0.1')
        postcode.css('opacity', '0.1')
        cvc.css('opacity', '0.1')
    }
}










function clearCreditCardInput () {
    var offline = $("#offline").prop("checked")
    var none = $("#none").prop("selected")
    var visa = $("#visa").prop("selected")
    var mastercard = $("#mastercard").prop("selected")
    var aExpress = $("#aExpress").prop("selected")
    var ccNumber = $("#ccNumber")
    var expDate = $("#expDate")
    var postcode = $("#postcode")
    var cvc = $("#cvc")

    if ((visa) || (mastercard) || (aExpress) || (none)){  //select any credit card type//
        ccNumber.val("")                                  //remove input//
        expDate.val("")
        postcode.val("")
        cvc.val("")
    }
    if (offline) {                                        //change payment method//
        ccNumber.val("")                                  //remove input//
        expDate.val("")
        postcode.val("")
        cvc.val("")
    }
}










function ordervalidate () {
    var customerName = $("#customerName").val()
    var eMail = $("#eMail").val()
    var phoneNumber = $("#phoneNumber").val()
    var pickup = $("#pickup").prop("checked")
    var delivery = $("#delivery").prop("checked")
    var dAddress = $("#dAddress").val()
    var bAddress = $("#bAddress").val()
    var online = $("#online").prop("checked")
    var offline = $("#offline").prop("checked")
    var cardType = $("#cardType").val()
    var ccNumber = $("#ccNumber").val()
    var expDate = $("#expDate").val()
    var postcode = $("#postcode").val()
    var cvc = $("#cvc").val()


    //utilities//
    var alphabet = /[a-zA-Z]/
    var visamaster =  /\b\d{4}[\s-]{1}\d{4}[\s-]{1}\d{4}[\s-]{1}\d{4}\b/  //specific pattern for Visa and Mastercard as shown with placeholder//
    var expressCard = /\b\d{4}[\s-]{1}\d{6}[\s-]{1}\d{5}\b/               //specific pattern for American Express as shown with placeholder//
    var number = /[0-9]/
    var specialCharacter = /[-@!%$*?&#^()_=+;:'".,<>`~]/                  //special character (may not be all of them)//
    var monthyear = /^(0[1-9]|1[0-2])[/]{1}\/?([0-9]{2})$/                // MM/YY (MM<13)//
    var fourdigit = /[0-9]{4}/                                            // 4 digits only//
    var cvcnumber = /[0-9]{3,4}/                                          // 3-4 digits//

    var errorMsg = "";
    var result = true;



    if (customerName == ""){
        errorMsg += "<li>Customer name cannot be empty.</li>"
    }
    if (customerName.match(number) || customerName.match(specialCharacter)) {
        errorMsg += "<li>Customer name must only contain alphabet letters.</li>"
    }
    if (phoneNumber == ""){
        errorMsg += "<li>Contact number cannot be empty.</li>"
    }
    if (phoneNumber.match(alphabet) || phoneNumber.match(specialCharacter)) {
        errorMsg += "<li>Phone number must only contain numbers.</li>"
    }
    if ((!pickup) && (!delivery)) {
        errorMsg += "<li>A preference must be selected.</li>"          
    }
    if (dAddress == ""){
        errorMsg += "<li>Delivery address cannot be empty. </li>"
    }
    if (bAddress == ""){
        errorMsg += "<li>Billing address cannot be empty. </li>"
    }
    if (eMail.indexOf('@') == 0 ) {
		errorMsg += "<li>Email cannot start with an @ symbol.</li>";
	}
	if (eMail.indexOf('@') < 0 ) {
		errorMsg += "<li>Email must contain an @ symbol.</li>";
	}
    if ((!online) && (!offline)) {
        errorMsg += "<li>A payment method must be selected.</li>"          
    }


    if (online){
        if (cardType == "X"){
            errorMsg += "<li>Please select a credit card type. </li>"
        }
    }



    if ((cardType =="Visa") ||(cardType =="Mastercard")){
        if (!ccNumber.match(visamaster)){
            errorMsg += "<li>Please enter the correct credit card number format as shown.</li>"
        }
        if (!expDate.match(monthyear)){
            errorMsg += "<li>Invalid input format for expiration date.</li>"
        }
        if (!postcode.match(fourdigit)){
            errorMsg += "<li>Postcode must only contain 4 numbers.</li>"
        }
        if (!cvc.match(cvcnumber)){
            errorMsg += "<li>CVC must only contain 3-4 numbers."
        }
    }
    if ((cardType =="American Express")){
        if (!ccNumber.match(expressCard)) {
            errorMsg += "<li>Please enter the correct credit card number format as shown.</li>"
        }
        if (!expDate.match(monthyear)){
            errorMsg += "<li>Invalid input format for expiration date.</li>"
        }
        if (!postcode.match(fourdigit)){
            errorMsg += "<li>Postcode must only contain 4 numbers.</li>"
        }
        if (!cvc.match(cvcnumber)){
            errorMsg += "<li>CVC must only contain 3-4 numbers."
        }
    }
    
    


    var numOfItems = ((errorMsg.match(/<li>/g)).length + 6);

    if (errorMsg != "") {
		errorMsg = "<div class='overlay' id='errorScrnOverlay'></div>"+
		"<section id='errorWindow' class='window'><ul>"+
		errorMsg +
		"</ul><a href='#' id='errorClose' class='button'>Close</a></section>"
		$("body").after(errorMsg);
		$("#errorScrnOverlay").css('visibility', 'visible');
		$("#errorWindow").css('height', numOfItems.toString() + 'em');
		$("#errorWindow").css('margin-top', (numOfItems/-2).toString +'em')
		$("#errorWindow").show();
		$("#errorClose").click (function() {
			$("#errorScrnOverlay").remove();
			$("#errorWindow").remove();
		}	);
		result = false;
    }
    return result;
}










function init () {
    // enable/disabled delivery address when delivery/pickup is selected//
    var pickup = $("#pickup");
    var delivery = $("#delivery")
    pickup.click(toggleDeliveryAddress)
    delivery.click(toggleDeliveryAddress)

    //enable/disabled card type when pay online/offline is selected//
    var online = $("#online")
    var offline = $("#offline")
    online.click(togglePayment)
    offline.click(togglePayment)
    

    //tipWindow function//
    var tipBtn = $("#tipBtn");
    var tipClose = $("#tipClose");
    tipBtn.click(showTipWin);
    tipClose.click(hideTipWin);


    //validate function//
    var regForm = $("#regForm");
    regForm.submit(regvalidate);


    //password function//  
    var pwdShowBtn = $("#pwdShowBtn");
    pwdShowBtn.click(passwordShowToggle)


    // duplicate address function //
    var dupAddressBtn = $("#dupAddressBtn")
    dupAddressBtn.click(fillingAddress)    


    // toggle readonly input //
    var cardType = $("#cardType")
    cardType.change(adaptiveCreditCard)

    
    //clear credit card input on card type change or payment method change//
    cardType.change(clearCreditCardInput)
    offline.click(clearCreditCardInput)

    
    // order page validate // 
    var orderForm = $("#orderForm")
    orderForm.submit(ordervalidate)
}


$(document).ready(init);


