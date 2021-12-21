const mongoose = require("mongoose");
const User = require("./models/User");
const POI = require("./models/POI");
const Category = require("./models/Category");
const Event = require("./models/Event");

mongoose.connect('mongodb+srv://poiGo:emadproject21@cluster0.sb9vr.mongodb.net/poiGo', { useNewUrlParser: true });

mongoose.connection
    .once("open", () => console.log("Connected to MongoDB"))
    .on("error", error => console.log("Error connecting to MongoDB:", error));

const user = new User({
    email: "chiccaesp98@gmail.com",
    password: "12345678",
    type: "Amministratore"
});

user.save();

const category = new Category({
    name: "Cultura",
    subcategories: [
        {
            name: "Beni architettonici",
            photo: "../../assets/img/subcategory/beniArchitettonici.jpg",
            sections: ["Ville e castelli"],
        }
    ]
})

category.save();

const poi = new POI({
    name: "Castello Giannone",
    photo: "../../assets/poi/castellogiannone.jpeg",
    description: " Al castello Giannone si accede dalla Piazza Garibaldi, spiazzo principale della cittadina di Calopezzati. " +
        " Si tratta di un castello la cui pianta a quadrilatero irregolare ha origine da impianto fortificato bizantino. " +
        " A partire dalla fine del 1200 assurge alle cronache quale palazzo signorile con relativa fortificazione. Diverse " +
        " sono le famiglie succedutesi nella proprietà del Castello e nella signoria di Calopezzati. Si annoverano i Caputo " +
        " dal 1272 al 1344, i dalla Marra per la restante parte del 1300, i Ruffo sino a circa la metà del 1400, i Sanseverino " +
        " sino alla metà del 500 a cui seguirono gli Abenante e gli Spinelli per alcuni decenni. Ad inizio 600 la " +
        " proprietà e la signoria passarono alla famiglia Mandatoriccio la cui duchessa Vittoria, unica erede, sposa attorno " +
        " alla metà del 600 Giuseppe Ruggero Sambiase. " +
        " Da qui in poi è Sambiase la famiglia che resterà proprietaria del Castello sino al 1900, anno in cui subentra " +
        " per acquisto la famiglia Giannone. Tanta storia e irraggiamenti con nobiltà di alto rango come testimonia, " +
        " ad esempio, la lapide di sepoltura nella chiesa dell’Addolorata dalla quale emergono legami famigliari dei Sambiase " +
        " con i d’Aragona i Piccolomini ed i Colonna. Il castello agli inizi del 1400 viene rivisitato con aggiunta di 4 torri " +
        " difensive angolari di cui una oggi risulta essere abbattuta per 1/3. Dalle fonti storiche risulta che nello stesso periodo " +
        " fu ordinato anche un abbellimento che vide tra gli adorni stupende bifore tardo gotiche di cui ne è sopravvissuta " +
        " una sola, visibile all’interno della corte. Progettista delle modifiche del 400 fu l’architetto militare Marco " +
        " Ruffo. Una particolarità: l’architettura di Ruffo accomuna il castello di Calopezzati ad alcuni Castelli della " +
        " Dalmazia. Da segnalare il pregio di due camini monumentali. Il primo, probabilmente risalente al XV secolo, è sito " +
        " in quella che fu la sala d’armi ed è in marmo verde finemente lavorato adornato da teste leonine in marmo anche esse; " +
        " il secondo, nella sala del Vallo è datato 1597 e si caratterizza per la presenza nel cono superiore di stemma " +
        " araldico sconosciuto scolpito magistralmente e da trave e fronte finemente scolpita, recante un “sole” centrale " +
        " stilizzato con viso sorridente. La fronte è sorretta da cariatidi di rara " +
        " bellezza, il tutto in pietra bianca. Nel periodo di transizione dai Spinelli ai Mandatoriccio, di circa 20 anni, il castello non viene abitato e verserà in condizioni di abbandono. Nel 1611 si chiudono" +
        " lavori di ampliamento delle stanze e di creazione di una ampia scala di accesso che riducono la corte con una sorta di portico interno. In questo frangente vengono " +
        " ricavati nuovi ambienti tra i quali la piccola e preziosa biblioteca. I tetti e le pareti vengono arricchiti da finiture lignee, cassoni e decorazioni pittoriche alcune " +
        " delle quali riportanti i blasoni dei Sambiasi, dei Colonna e D’aragona. Al castello si accede da un cancello innestato in un primo ordine di mura di recinzione che contengono anche il giardino. Dal cancello parte una rampa che porta " +
        " verso gli ingressi interni del giardino ed al portone originariamente dotato di ponte levatoio di cui ancor oggi sono visibili le catene e l’orditura. Il fosso difensivo, " +
        " intatto, è attraversabile con ponticello in legno. L’ingresso introduce alla corte interna a sinistra della quale sussiste la scalinata originaria del 1611 che porta al " +
        " piano nobile. La scala termina ad un sorta di anticamera delimitato da un cancelletto del XVII secolo in ferro battuto finemente lavorato. Sulla sinistra " +
        " dell’anticamera v’è l’accesso al salone delle adunanze e delle udienze ed alla sala d’armi, a destra si accede alla biblioteca e ad ambienti privati. Al piano terra vi " +
        " sono i locali adibiti alle maestranze ed ai servizi mentre un piano più basso conteneva le prigioni ed altri locali di deposito. Non si conosce se sussistono o meno " +
        " sotterranei. Leggenda vuole che almeno due fossero le gallerie segrete se non tre di cui 1 recante verso la costa, una verso i monti ed un’altra verso il convento " +
        " dei Riformati. Il castello è molto ben conservato ed ha mantenuto il fascino delle antiche magioni, nonostante negli anni 30 alcune ristrutturazioni abbiano fatto " +
        " perdere alcuni degli elementi di adorno di maggior pregio come la maggior le bifore tardo gotiche. ",
    opening_hours: "Visite solo su appuntamento",
    is_Validate: true,
    coordinates: ["39°33’ 37.70” N", "16°48’06.91” E"],
    category: [
        category,
    ],
    createdBy: "castellogiannone@gmail.com",
});

poi.save();

const event = new Event({
    description: "Festa di fine anno",
    date: "2022-01-01",
    address: {
        street: "Piazza G. Garibaldi",
        city: "Calopezzati",
        cap: "87060",
    },
    hour: "00:00",
    createdBy: "castellogiannone@gmail.com"
});

event.save();
    