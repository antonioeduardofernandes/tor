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
        const favouredSkillStatus = skill.favoured ? "favoured" : "normal"

        const dialogContent = await renderTemplate("systems/tor/templates/dialog/skill-roll.html", { inspired: false, usingHope: false, type: favouredSkillStatus })
        let dialogTitle = await `${game.i18n.localize("TOR.skillTest").titleCase()}: ` + game.i18n.localize(`TOR.${skillName}`).titleCase()

        await new Dialog({
            title: dialogTitle,
            content: dialogContent,
            buttons: {
                normal: {
                    label: "Rolar",
                    callback: (html) => this._onDialogSubmit(html, skillValue, tn)
                },
            },
            close: () => { }
        }).render(true);

    }

    _onDialogSubmit(html, skillValue, tn) {
        let bonusSuccessDice = Number(html.find(".tor-dialog .bonus")[0].value)
        let skillScore = Number(skillValue)

        let favoured = html.find(".tor-dialog .favoured")[0].checked
        let illFavoured = html.find(".tor-dialog .illFavoured")[0].checked


        // If bonus dice + success Dice is less than 0 return 0
        let successDice = bonusSuccessDice + skillScore > 0 ? bonusSuccessDice + skillScore : 0

        torRoll({ successDice, tn, favoured, illFavoured })
    }
}
