// Declarar el objeto para que no falle
let es = { brujula: { paymentMethods: {} }};


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
    cardType: string;
    price: number;
    discountFee: number = 10;
    isSelected() {
        try { 
            if (this.paymentMethodId === "Tarjeta") {
                if (this.cardType) { return true } else { return false }
            } else {
                return document.querySelector("input[type=radio][name='MethodPay'][id=" + this.paymentMethodId + "]").checked;
            } 
        } catch (e) { return false }
    }
    getTotalFee() {
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
    }
    getTotalFeeWithoudDiscounts() {
        switch (this.paymentMethodId) {
            case "Efectivo": return 1.5 + this.price;
            case "Paypal": return 8.30 + this.price;
            case "Tarjeta":
                switch (this.cardType) {
                    case "visa": return 2.80 + this.price ;
                    case "mastercard": return 3.20 + this.price ;
                    case "american": return 6.80 + this.price;
                }
        }
    }
    initView(): void {

    }
    constructor(paymentMethodId: string, price: number, cardType: string) {
        this.paymentMethodId = paymentMethodId;
        this.price = price;
        this.cardType = cardType
        this.initView();
    }
}


window.onload = () => {
    try {
        // Parte de los radios
        let inputRadio = document.querySelectorAll("input[type=radio][name='MethodPay']");
        let cardType = document.querySelector('#cardTipe');
        console.log(inputRadio);
        for (let radio of inputRadio) {
            if (radio.id === "Tarjeta") {
                cardType.addEventListener("change", () => {
                    if (radio.checked) {
                        let price = parseFloat(document.querySelector("input[id='price-input'][type='number']").value);
                        es.brujula.paymentMethods = new PaymentMethod(radio.id, price, cardType.value);
                        console.log(es.brujula.paymentMethods);
                    }
                });
            } else {
                radio.addEventListener("change", () => {
                    let price = parseFloat(document.querySelector("input[id='price-input'][type='number']").value);
                    es.brujula.paymentMethods = new PaymentMethod(radio.id, price);
                    console.log(es.brujula.paymentMethods);
                });
            }
        }
    }catch (e) {}

    try {
        // Parte de los botones
        let btnTest = document.querySelectorAll("button[name='btn-test']");
        console.log(btnTest);
        for (let btn of btnTest) {
            btn.addEventListener("click", () => {
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
        }
    }catch (e) {}
};



// Animaciones y parte visual del HTML
