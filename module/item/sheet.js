import { TOR } from "../config";

export class TORItemSheet extends ItemSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tor", "sheet", "item"],
      width: 560,
      height: 600,
      resizable: false,
      tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "details" }]
    });
  }


  get template() {
    let path = "systems/TOR.templates/sheets/items/"
    return `${path}/${this.item.data.type}.html`;
  }


  getData() {
    const data = super.getData();
    const itemData = data.data;
    data.config = CONFIG.TOR

    //GET ITEM DATA FROM TRANSLATION FILE
    data.itemType = game.i18n.localize(`ITEM.Type${data.item.type.titleCase()}`)

    //GET WEAPON TYPE AND GROUP
    if (data.item.type === "weapon") {
      data.type = this._getWeaponType(itemData)
      data.weaponGroup = this._getWeaponGroup(itemData)
    }

    data.item = itemData;
    data.data = itemData.data;
    return data;
  }



  _getWeaponType(itemData) {
    if (itemData.type !== "weapon") return
    return itemData.data.weaponType ? game.i18n.localize(`TOR.${(itemData.data.weaponType)}`) : ""
  }

  _getWeaponGroup(itemData) {
    if (itemData.type !== "weapon") return
    return itemData.data.proficiency ? game.i18n.localize(`TOR.${(itemData.data.proficiency)}`) : ""
  }






}
