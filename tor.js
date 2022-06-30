import { TOR } from "./module/config.js"

import { TORActorSheet } from "./module/actor/sheet.js"
import { TORItemSheet } from "./module/item/sheet.js"



Hooks.once("init", function () {
    // game.tor = {
    //     TORActor,
    //     TORItem
    // }

    CONFIG.TOR = TOR

    //Unregister default sheets
    Items.unregisterSheet("core", ItemSheet);
    Actors.unregisterSheet("core", ActorSheet);

    Items.registerSheet("tor", TORItemSheet, { makeDefault: true });
    Actors.registerSheet("tor", TORActorSheet, { makeDefault: true });

    return preloadHandlebarsTemplates();

})