export class TORActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "actor", "hero"],
      width: 800,
      height: 697,
      resizable: true,
      tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "skills" }]
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
      this._prepareSkills(data)
      this._prepareItems(data)
    }

    return data
  }

  // prepare each skill group to display on each column
  _prepareSkills(data) {
    const actorData = data.actor.data

    let strengthSkills = []
    let heartSkills = []
    let witsSkills = []

    for (let [skill, key] of Object.entries(actorData.data.skills)) {
      key.label = game.i18n.localize(`TOR.${skill}`).titleCase()

      if (key.attribute === "strength") {
        strengthSkills.push(skill)
      }
      if (key.attribute === "heart") {
        heartSkills.push(skill)
      }
      if (key.attribute === "wits") {
        witsSkills.push(skill)
      }
    }
    data.strengthSkills = strengthSkills
    data.heartSkills = heartSkills
    data.witsSkills = witsSkills
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
      if (item.type === "culture" || item.type === "trait") {
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

    // owner only
    if (this.actor.isOwner) {
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

      //toggle equip status for item
      html.find(".item-control.item-equip").click(event => {
        event.preventDefault()
        const div = event.currentTarget.closest(".item-row")
        const item = this.actor.items.get(div.dataset.itemId)
        return item.update({ "data.equiped": !item.data.data.equiped })
      })

      //toggle twoHanded if versatile else returns
      html.find(".item-control.item-wield").click(event => {
        event.preventDefault()
        const div = event.currentTarget.closest(".item-row")
        const item = this.actor.items.get(div.dataset.itemId)
        if (!item.data.data.wieldType.versatile) return
        let newValue = item.data.data.wieldType.value === "1" ? "2" : "1"
        return item.update({ "data.wieldType.value": newValue })
      })

      //toggle skill favoured
      html.find(".skill-control.skill-favoured").click(event => {
        event.preventDefault()
        const element = event.currentTarget.closest(".skill")
        const skillName = element.dataset.skill

        let skill = this.actor.data.data.skills[skillName]
        let isFavoured = skill.favoured

        return this.actor.update({ [`data.skills.${skillName}.favoured`]: !isFavoured })
      })

      // change skill value
      html.find(".skill-control.skill-score").click(event => {
        event.preventDefault()
        const dataElement = event.currentTarget.closest(".skill")
        const skillName = dataElement.dataset.skill

        let currentScore = this.actor.data.data.skills[skillName].value

        const scoreElement = event.currentTarget.closest(".skill-score")
        let score = Number(scoreElement.dataset.score)

        //if currentScore is already 1 toggle it to 0
        // if (currentScore === 1 && score === 1) score = 0
        if (currentScore === score) score = score - 1

        return this.actor.update({ [`data.skills.${skillName}.value`]: score })
      })
    }
  }


}
