export class TORActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "actor", "hero"],
      width: 800,
      height: 697,
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

  // prepare each item type
  _prepareItems(data) {

    const weapons = []
    const armor = []
    const miscItems = []
    const features = []
    const virtues = []
    const rewards = []

    for (let item of data.items) {

      if (item.type === "weapon") {
        weapons.push(item)
      }
      if (item.type === "armor" || item.type === "shield") {
        armor.push(item)
      }
      if (item.type === "item" || item.type === "mount") {
        miscItems.push(item)
      }
      if (item.type === "virtue") {
        virtues.push(item)
      }
      if (item.type === "reward") {
        rewards.push(item)
      }
      if (item.type === "fellAbility") {
        ui.warnings.error("Não é possível atribuir uma Habilidade Terrível a um herói")
      }
      else {
        features.push(item)
      }
    }
    data.weapons = weapons
    data.armor = armor
    data.miscItems = miscItems
    data.virtues = virtues
    data.rewards = rewards
    data.features = features
  }

  activateListeners(html) {
    super.activateListeners(html)

    //delete item
    html.find(".item-control.item-delete").click(event => {
      event.preventDefault()
      const div = event.currentTarget.closest(".item-row")
      const item = this.actor.items.get(div.dataset.itemId)
      return item.delete()
    })

    //edit item
    html.find(".item-control.item-edit").click(event => {
      event.preventDefault()
      const div = event.currentTarget.closest(".item-row")
      const item = this.actor.items.get(div.dataset.itemId)
      return item.sheet.render(true)
    })

    //toggle equip item
    html.find(".item-control.item-toggle").click(event => {
      event.preventDefault()
      const div = event.currentTarget.closest(".item-row")
      const item = this.actor.items.get(div.dataset.itemId)
      item.update({ "data.equiped": !item.data.data.equiped })
    })
  }
}
