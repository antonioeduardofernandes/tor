export class TORItemSheet extends ItemSheet {

  constructor(...args) {
    super(...args);

    // Expand the default size of the class sheet
    if (this.object.data.type === "weapon"|| this.object.data.type === "culture") {
      this.options.height = this.position.height = 670;
    }
    if (this.object.data.type === "armor") {
      this.options.height = this.position.height = 600;
    }
    if (this.object.data.type === "shield") {
      this.options.height = this.position.height = 480;
    }
    if (this.object.data.type === "mount") {
      this.options.height = this.position.height = 380;
    }
    if (this.object.data.type === "trait") {
      this.options.height = this.position.height = 380;
      this.options.height = this.position.width = 614;
    }
  }


  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "item"],
      width: 560,
      height: 400,
      resizable: false,
      // tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "details" }],
    });
  }


  get template() {
    const path = "systems/tor/templates/item"
    return `${path}/${this.item.data.type}.html`;
  }


  getData() {
    const data = super.getData();
    const itemData = data.data;
    data.config = CONFIG.TOR

    //localizes item general type
    data.itemType = game.i18n.localize(`ITEM.Type${data.item.type.titleCase()}`)

    //localizes item types and proficiency groups
    if (data.item.type === "weapon") {
      data.weaponGroup = this._getWeaponGroup(itemData)
    }

    if (data.item.type === "weapon" || data.item.type === "armor") {
      data.type = this._getItemType(itemData)
    }


    //boilerplate content
    data.item = itemData;
    data.data = itemData.data;

    return data;
  }

  // gets type of the item and returns it localized
  _getItemType(itemData) {
    if (itemData.type === "weapon") return itemData.data.weaponType ? game.i18n.localize(`TOR.${(itemData.data.weaponType)}`) : ""
    if (itemData.type === "armor") return itemData.data.armorType ? game.i18n.localize(`TOR.${(itemData.data.armorType)}`) : ""
  }

  // gets weapon proficiency group and returns it localized
  _getWeaponGroup(itemData) {
    if (itemData.type !== "weapon") return
    return itemData.data.proficiency ? game.i18n.localize(`TOR.${(itemData.data.proficiency)}`) : ""
  }
}