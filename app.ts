// Declarar el objeto para que no falle
let es = { brujula: { paymentMethods: {} }};

// Genero una funcion para ahorrar trabajo y lineas de codigo mas adelante (metodo initView)
function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// Creamos uan interface para asegurarnos que todas las clases que la implementen cumplan los requisitos.
interface Payment {
    view: any;
    paymentMethodId: string;
    isSelected(): any;
    getTotalFee(): any;
    getTotalFeeWithoudDiscounts(): any;
    initView(): void;
}

// Ahora definimos la clase que utilizara cada instancia de los objetos creados.
class PaymentMethod implements Payment {
    view = {};
    paymentMethodId: string;
    // Estas 3 propiedades son nuevas, para añadir mejoras y mas funcionalidad.
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
        let isSelected = document.createElement("button");
        isSelected.innerHTML = "isSelected";
        setAttributes(isSelected, {"class": "btn btn-primary", "type": "button", "name": "btn-test", "value": "isSelected"});
        let getTotalFee = document.createElement("button");
        getTotalFee.innerHTML = "getTotalFee";
        setAttributes(getTotalFee, {"class": "btn btn-primary", "type": "button", "name": "btn-test", "value": "getTotalFee"});
        let getTotalFeeWithoudDiscounts = document.createElement("button");
        getTotalFeeWithoudDiscounts.innerHTML = "getTotalFeeWithoudDiscounts";
        setAttributes(getTotalFeeWithoudDiscounts, {"class": "btn btn-primary", "type": "button", "name": "btn-test", "value": "getTotalFeeWithoudDiscounts"});
        this.view = {
            isSelected: isSelected,
            getTotalFee: getTotalFee,
            getTotalFeeWithoudDiscounts: getTotalFeeWithoudDiscounts
        };
    }
    // No Se creo la funcion "init" porque typescript ya tiene su propio construcctor.
    constructor(paymentMethodId: string, price: number, cardType: string) {
        this.paymentMethodId = paymentMethodId;
        this.price = price;
        this.cardType = cardType;
        this.initView();
    }
}


window.onload = () => {
    try {
        // Parte de los radios: Llamadas al DOM para recoger la informacion.
        let inputRadio = document.querySelectorAll("input[type=radio][name='MethodPay']");
        let cardType = document.querySelector('#cardTipe');
        // console.log(inputRadio);
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
        // Parte de los botones: A esta informacion se puede acceder atraves de la instancia, y los objetos HTML estan en la propiedad view, pero los cree de igual modo para hacer pruebas.
        let btnTest = document.querySelectorAll("button[name='btn-test']");
        // console.log(btnTest);
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