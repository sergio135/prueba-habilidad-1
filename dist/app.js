// Declarar el objeto para que no falle
var es = { brujula: { paymentMethods: "1" } };
// Ahora definimos la clase que utilizara cada instancia de los objetos creados, para los eventos en el DOM sobre metodos de pago.
var PaymentMethod = (function () {
    function PaymentMethod(paymentMethodId) {
        this.view = {};
        this.paymentMethodId = paymentMethodId;
        this.initView();
    }
    PaymentMethod.prototype.isSelected = function () {
    };
    ;
    PaymentMethod.prototype.getTotalFee = function () {
    };
    ;
    PaymentMethod.prototype.getTotalFeeWithoudDiscounts = function () {
    };
    PaymentMethod.prototype.initView = function () {
    };
    return PaymentMethod;
}());
// Animaciones y parte visual del HTML 
//# sourceMappingURL=app.js.map