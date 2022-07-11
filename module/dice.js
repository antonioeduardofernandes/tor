export async function torRoll({
    successDice = 0,
    tn,
    favoured = false,
    illFavoured = false
}) {


    let fateDie = "1d12"
    if (favoured) fateDie = "2d12kh"
    if (illFavoured) fateDie = "2d12kl"
    if (favoured && illFavoured) fateDie = "1d12"

    let formula = `${fateDie} + ${successDice}d6`

    let roll = new Roll(formula).toMessage()

    // get number of success 6's to display
    // console.log(roll)

}