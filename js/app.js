// Declarar el objeto para que no falle
var es = { brujula: { paymentMethods: {} } };
// Genero una funcion para ahorrar trabajo y lineas de codigo mas adelante (metodo initView)
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
// Ahora definimos la clase que utilizara cada instancia de los objetos creados.
var PaymentMethod = (function () {
    // No Se creo la funcion "init" porque typescript ya tiene su propio construcctor.
    function PaymentMethod(paymentMethodId, price, cardType) {
        this.view = {};
        this.discountFee = 10;
        this.paymentMethodId = paymentMethodId;
        this.price = price;
        this.cardType = cardType;
        this.initView();
    }
    PaymentMethod.prototype.isSelected = function () {
        try {
            if (this.paymentMethodId === "Tarjeta") {
                if (this.cardType) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return document.querySelector("input[type=radio][name='MethodPay'][id=" + this.paymentMethodId + "]").checked;
            }
        }
        catch (e) {
            return false;
        }
    };
    PaymentMethod.prototype.getTotalFee = function () {
        // Los precios de las tarjetas como no se indico de otra forma, los incluyo aqui, aunque lo mejor fuese cogerlos por el constructor.
        switch (this.paymentMethodId) {
            case "Efectivo": return 1.5 + (this.price - (this.discountFee * this.price / 100));
            case "Paypal": return 8.30 + (this.price - (this.discountFee * this.price / 100));
            case "Tarjeta":
                switch (this.cardType) {
                    case "visa": return 2.80 + (this.price - (this.discountFee * this.price / 100));
                    case "mastercard": return 3.20 + (this.price - (this.discountFee * this.price / 100));
                    case "american": return 6.80 + (this.price - (this.discountFee * this.price / 100));
                }
        }
    };
    PaymentMethod.prototype.getTotalFeeWithoudDiscounts = function () {
        switch (this.paymentMethodId) {
            case "Efectivo": return 1.5 + this.price;
            case "Paypal": return 8.30 + this.price;
            case "Tarjeta":
                switch (this.cardType) {
                    case "visa": return 2.80 + this.price;
                    case "mastercard": return 3.20 + this.price;
                    case "american": return 6.80 + this.price;
                }
        }
    };
    PaymentMethod.prototype.initView = function () {
        var isSelected = document.createElement("button");
        isSelected.innerHTML = "isSelected";
        setAttributes(isSelected, { "class": "btn btn-primary", "type": "button", "name": "btn-test", "value": "isSelected" });
        var getTotalFee = document.createElement("button");
        getTotalFee.innerHTML = "getTotalFee";
        setAttributes(getTotalFee, { "class": "btn btn-primary", "type": "button", "name": "btn-test", "value": "getTotalFee" });
        var getTotalFeeWithoudDiscounts = document.createElement("button");
        getTotalFeeWithoudDiscounts.innerHTML = "getTotalFeeWithoudDiscounts";
        setAttributes(getTotalFeeWithoudDiscounts, { "class": "btn btn-primary", "type": "button", "name": "btn-test", "value": "getTotalFeeWithoudDiscounts" });
        this.view = {
            isSelected: isSelected,
            getTotalFee: getTotalFee,
            getTotalFeeWithoudDiscounts: getTotalFeeWithoudDiscounts
        };
    };
    return PaymentMethod;
}());
window.onload = function () {
    try {
        // Parte de los radios: Llamadas al DOM para recoger la informacion.
        var inputRadio = document.querySelectorAll("input[type=radio][name='MethodPay']");
        var cardType_1 = document.querySelector('#cardTipe');
        // console.log(inputRadio);
        var _loop_1 = function(radio) {
            if (radio.id === "Tarjeta") {
                cardType_1.addEventListener("change", function () {
                    if (radio.checked) {
                        var price = parseFloat(document.querySelector("input[id='price-input'][type='number']").value);
                        es.brujula.paymentMethods = new PaymentMethod(radio.id, price, cardType_1.value);
                        console.log(es.brujula.paymentMethods);
                    }
                });
            }
            else {
                radio.addEventListener("change", function () {
                    var price = parseFloat(document.querySelector("input[id='price-input'][type='number']").value);
                    es.brujula.paymentMethods = new PaymentMethod(radio.id, price);
                    console.log(es.brujula.paymentMethods);
                });
            }
        };
        for (var _i = 0, inputRadio_1 = inputRadio; _i < inputRadio_1.length; _i++) {
            var radio = inputRadio_1[_i];
            _loop_1(radio);
        }
    }
    catch (e) { }
    try {
        // Parte de los botones: A esta informacion se puede acceder atraves de la instancia, y los objetos HTML estan en la propiedad view, pero los cree de igual modo para hacer pruebas.
        var btnTest = document.querySelectorAll("button[name='btn-test']");
        // console.log(btnTest);
        var _loop_2 = function(btn) {
            btn.addEventListener("click", function () {
                switch (btn.value) {
                    case "isSelected":
                        console.log(es.brujula.paymentMethods.isSelected());
                        break;
                    case "getTotalFee":
                        console.log(es.brujula.paymentMethods.getTotalFee());
                        break;
                    case "getTotalFeeWithoudDiscounts":
                        console.log(es.brujula.paymentMethods.getTotalFeeWithoudDiscounts());
                        break;
                }
            });
        };
        for (var _a = 0, btnTest_1 = btnTest; _a < btnTest_1.length; _a++) {
            var btn = btnTest_1[_a];
            _loop_2(btn);
        }
    }
    catch (e) { }
};
//# sourceMappingURL=app.js.map