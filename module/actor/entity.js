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
}
