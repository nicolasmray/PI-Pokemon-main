// const regexID = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//                 // /^[^\s@]+@[^\s@]+\.[^\s@]+$
// const expresionRegular = /^(?=.{1,35}$).+
// const regexName = /^(?=.*\d)[0-9a-zA-Z]{6,10}$/

const regexName = /^[a-z]{1,25}$/
const regexCharacteristic = /^(?!0)\d{1,3}$/
const regexImage = /^(ftp|http|https):\/\/[^ "]+$/

function validation(data){
    const errors = {}
    //if(!regexID.test(data.id)) errors.id = 'Enter a valid ID'
    //if(!expresionRegular.test(data.id)) errors.id = '1 to 35 characters length required'
    //if(!regexName.test(data.name)) errors.name = 'Name must contain at least one number and a length of 6 to 10 characters'

    if(!regexName.test(data.name)) errors.name = 'Only letters accepted (Maximum 25)'
    if(!regexImage.test(data.image)) errors.image = 'Only valid http links accepted'

    if (!regexCharacteristic.test(data.height)) errors.height = 'Only numbers from 1 to 999 accepted';
    if (!regexCharacteristic.test(data.weight)) errors.weight = 'Only numbers from 1 to 999 accepted';
    if (!regexCharacteristic.test(data.hp)) errors.hp = 'Only numbers from 1 to 999 accepted';
    if (!regexCharacteristic.test(data.attack)) errors.attack = 'Only numbers from 1 to 999 accepted';
    if (!regexCharacteristic.test(data.defense)) errors.defense = 'Only numbers from 1 to 999 accepted';
    if (!regexCharacteristic.test(data.speed)) errors.speed = 'Only numbers from 1 to 999 accepted';

    return errors

}

export default validation