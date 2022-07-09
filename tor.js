import { TOR } from "./module/config.js"

// Import Documents
import TORActor from "./module/actor/entity.js"
// import TORItem from "./module/item/entity.js";

// Import Sheets
import { TORActorSheet } from "./module/actor/sheet.js"
import { TORItemSheet } from "./module/item/sheet.js"

// Import Handlebar Templates Module
import { preloadHandlebarsTemplates } from "./module/helpers/templates.js"

Hooks.once("init", function () {
    game.tor = {
        TORActor,
        // TORItem
    }

    CONFIG.TOR = TOR
    CONFIG.Actor.documentClass = TORActor;
    // CONFIG.Item.documentClass = TORItem;

    //Unregister default sheets
    Items.unregisterSheet("core", ItemSheet);
    Actors.unregisterSheet("core", ActorSheet);

    Items.registerSheet("tor", TORItemSheet, { makeDefault: true });
    Actors.registerSheet("tor", TORActorSheet, { makeDefault: true });

    return preloadHandlebarsTemplates();

})