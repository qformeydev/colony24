import Shop from './shop.class';
import Boat from './boat.class';

export default class BuyBoat extends Shop
{
    constructor(id)
    {
        super(id);
        this.id = id;
        this.$el = $("div#button-shop");

        // On lance la propriété crée dans le parent shop.class.js
        this.create_button();


        // On accroche un événement on click sur la div button-shop en passant en paramètre Boat,
        // le context de la class BuyBoat et l'id du constructor
        // On met ensuite en callback this.buy_boat
        this.$el.on('click', `input[data-id=${id}]`, { class: Boat, that: this, id: id }, this.buy_boat);
    }

    buy_boat(e){

        // e correspond à l'object événement renvoyé par jQuery, il contient donc toutes les informations
        // du DOM dont la position de la souris la touche préssée etc..
        // jQuery nous crée un objet data dans tout ça qui contient nos paramètre
        // class that et id
        // Si j'envoie this en paramètre c'est pour une bonne raison
        // le context this d'un événement jQuery est l'élément du DOM
        // donc dans ce cas ci la div avec l'id button-shop
        // j'avais donc ici besoin de pouvoir accéder a la référence au parent contenue dans l'objet BuyBoat

        let data = e.data;
        let parent = data.that.parent;

        if (parent.wallet.ecu < 100){

            return console.log("Vous n'avez pas assez d'écu");

        } else {

            parent.boats[parent.id] = new data.class(undefined,parent.id);
            parent.id++;
            console.log(parent);
            parent.wallet.ecu -= 100;
            parent.wallet.renderWallet();
            parent.saveDataJson(parent);

            parent.wallet.renderWallet();

            console.log(parent);

        }

    }
}