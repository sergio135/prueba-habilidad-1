// Declarar el objeto para que no falle
var es = { brujula: { paymentMethods: {} } };
// Ahora definimos la clase que utilizara cada instancia de los objetos creados, para los eventos en el DOM sobre metodos de pago.
var PaymentMethod = (function () {
    function PaymentMethod(paymentMethodId, price) {
        this.view = {};
        this.discountFee = 10;
        this.paymentMethodId = paymentMethodId;
        this.price = price;
        this.initView();
    }
    PaymentMethod.prototype.isSelected = function () {
        return document.querySelector("input[type=radio][name='MethodPay'][id=" + this.paymentMethodId + "]").checked;
    };
    ;
    PaymentMethod.prototype.getTotalFee = function () {
        switch (this.paymentMethodId) {
            case "Efectivo": return 1.5 + (this.price - (this.discountFee * this.price / 100));
            case "Paypal": return 8.30 + (this.price - (this.discountFee * this.price / 100));
            case "Tarjeta": return 6.80 + (this.price - (this.discountFee * this.price / 100));
        }
    };
    ;
    PaymentMethod.prototype.getTotalFeeWithoudDiscounts = function () {
        switch (this.paymentMethodId) {
            case "Efectivo": return 1.5 + this.price;
            case "Paypal": return 8.30 + this.price;
            case "Tarjeta": return 6.80 + this.price;
        }
    };
    PaymentMethod.prototype.initView = function () {
    };
    return PaymentMethod;
}());
window.onload = function () {
    try {
        // Parte de los radios
        var inputRadio = document.querySelectorAll("input[type=radio][name='MethodPay']");
        console.log(inputRadio);
        var _loop_1 = function(radio) {
            radio.addEventListener("change", function () {
                var price = parseFloat(document.querySelector("input[id='price-input'][type='number']").value);
                es.brujula.paymentMethods = new PaymentMethod(radio.id, price);
                console.log(es.brujula.paymentMethods);
            });
        };
        for (var _i = 0, inputRadio_1 = inputRadio; _i < inputRadio_1.length; _i++) {
            var radio = inputRadio_1[_i];
            _loop_1(radio);
        }
    }
    catch (e) { }
    try {
        // Parte de los botones
        var btnTest = document.querySelectorAll("button[name='btn-test']");
        console.log(btnTest);
        var _loop_2 = function(btn) {
            btn.addEventListener("click", function () {
                switch (btn.value) {
                    case "isSelected":
                        console.log('Boton isSelected');
                        console.log(es.brujula.paymentMethods.isSelected());
                        break;
                    case "getTotalFee":
                        console.log('Boton getTotalFee');
                        console.log(es.brujula.paymentMethods.getTotalFee());
                        break;
                    case "getTotalFeeWithoudDiscounts":
                        console.log('Boton getTotalFeeWithoudDiscounts');
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
// Animaciones y parte visual del HTML 
//# sourceMappingURL=app.js.map