export class TORActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "actor", "hero"],
      width: 800,
      height: 620,
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

    data.rollData = data.actor.getRollData();

    return data
  }
}
