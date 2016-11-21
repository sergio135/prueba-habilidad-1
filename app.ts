// Declarar el objeto para que no falle
let es = {brujula: {paymentMethods: "1"}};

// Creamos uan interface para asegurarnos que todas las clases que la implementen cumplan los requisitos (No necesario en este ejemplo);
interface Payment {
    view: any;
    paymentMethodId: string;
    isSelected(): any;
    getTotalFee(): any;
    getTotalFeeWithoudDiscounts(): any;
    initView(): void;
}

// Ahora definimos la clase que utilizara cada instancia de los objetos creados, para los eventos en el DOM sobre metodos de pago.
class PaymentMethod implements Payment {
    view = {};
    paymentMethodId: string;
    isSelected() {

    };
    getTotalFee() {

    };
    getTotalFeeWithoudDiscounts() {

    }
    initView(): void {

    }
    constructor(paymentMethodId: string) {
        this.paymentMethodId = paymentMethodId;
        this.initView();
    }
}







// Animaciones y parte visual del HTML