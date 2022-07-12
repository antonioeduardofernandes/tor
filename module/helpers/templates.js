export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        // Actor Partials
        "systems/tor/templates/actor/partials/resources.html",
        "systems/tor/templates/actor/partials/skills.html",
        "systems/tor/templates/actor/partials/skill-traits.html",
        "systems/tor/templates/actor/partials/proficiencies.html",
        "systems/tor/templates/actor/partials/inventory.html",
        "systems/tor/templates/actor/partials/features.html",

    ])
}