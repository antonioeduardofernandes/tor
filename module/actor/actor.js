export class TORActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "actor", "hero"],
      width: 950,
      height: 620,
      resizable: true,
      tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "general" }]
    });
  }



  get template() {
    return `systems/tor/templates/sheets/actors/${this.actor.data.type}-sheet.html`;
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
