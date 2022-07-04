export class TORActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "actor", "hero"],
      width: 800,
      height: 620,
      resizable: true,
      tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "inventory" }]
    });
  }



  get template() {
    const path = "systems/tor/templates/actor"
    return `${path}/${this.actor.data.type}.html`;
  }



  getData() {
    const data = super.getData();
    const actorData = data.actor.data
    data.config = CONFIG.TOR

    data.data = actorData.data
    data.flags = actorData.flags

    if (actorData.type === "hero") {
      this._prepareItems(data)
    }

    data.rollData = data.actor.getRollData();


    return data
  }


  _prepareItems(data) {
    const weapons = []
    const features = []

    for (let item of data.items) {
      if (item.type === "weapon") {
        weapons.push(item)
      }
    }
    data.weapons = weapons
    data.features = features
  }

  activateListeners(html) {
    super.activateListeners(html)

    //delete item
    html.find(".item-delete").click(ev => {
      ev.preventDefault()
      const li = ev.currentTarget.closest(".item")
      const item = this.actor.items.get(li.dataset.itemId)
      return item.delete(0)
    })
  }
}
