const regexID = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                // /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const expresionRegular = /^(?=.{1,35}$).+/

const regexName = /^(?=.*\d)[0-9a-zA-Z]{6,10}$/

function validation(data){
    const errors = {}

    //if(!regexID.test(data.id)) errors.id = 'Enter a valid ID'

    //if(!expresionRegular.test(data.id)) errors.id = '1 to 35 characters length required'

    //if(!regexName.test(data.name)) errors.name = 'Name must contain at least one number and a length of 6 to 10 characters'

    return errors

}

export default validation