import { torRoll } from "../dice.js";

export default class TORActor extends Actor {

    prepareData() {
        super.prepareData();
    }

    prepareBaseData() {
    }

    prepareDerivedData() {
        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags.tor || {};

        this._prepareHeroData(actorData)

    }

    _prepareHeroData(actorData) {
        if (actorData.type !== "hero") return
        const data = actorData.data

        // Calculate the tn for each attribute
        for (let [key, attribute] of Object.entries(data.attributes)) {
            attribute.tn = 20 - attribute.value;
        }
    }

    getRollData() {
        const data = super.getRollData()
        return data
    }

    async skillRoll(skillName, favoured = false, illFavoured = false) {
        const skill = this.data.data.skills[skillName]
        const skillValue = this.data.data.skills[skillName].value
        const tn = this.data.data.attributes[skill.attribute].tn

        const dialogContent = await renderTemplate("systems/tor/templates/chat/skill-roll-dialog.html")
        let dialogTitle = await `${game.i18n.localize("TOR.skillTest").titleCase()}: ` + game.i18n.localize(`TOR.${skillName}`).titleCase()

        await new Dialog({
            title: dialogTitle,
            content: dialogContent,
            buttons: {
                favoured: {
                    label: "Favorecido",
                    callback: (html) => this._onDialogSubmit(html, skillValue, tn, favoured = true)
                },
                normal: {
                    label: "Normal",
                    callback: (html) => this._onDialogSubmit(html, skillValue, tn)
                },
                illFavoured: {
                    label: "Desfavorecido",
                    callback: (html) => this._onDialogSubmit(html, skillValue, tn, illFavoured = true)
                }
            },
            close: () => { }
        }).render(true);

    }

    _onDialogSubmit(html, skillValue, tn, favoured = false, illFavoured = false) {
        let bonusSuccessDice = Number(html.find(".tor-dialog .bonus")[0].value)
        let skillScore = Number(skillValue)

        // If bonus dice + success Dice is less than 0 return 0
        let successDice = bonusSuccessDice + skillScore > 0 ? bonusSuccessDice + skillScore : 0

        torRoll({ successDice, tn, favoured, illFavoured })
    }
}
