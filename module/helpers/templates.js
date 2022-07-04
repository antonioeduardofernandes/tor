export const preloadHandlebarsTemplates = async function(){
    return loadTemplates([
        //Actor Partials
        "systems/tor/templates/actor/partials/resources.html",
        "systems/tor/templates/actor/partials/inventory.html"
    ])
}