var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

function isValid(string, tester) {
    var valid;
    if(tester == "email"){
        valid = emailRegex.test(string);
        if(!valid)
            return false;
        return true;
    } else if (tester == "password"){
        valid = passwordRegex.test(string);
        if(!valid)
            return false;
        return true;
    } else return -1;
    
}

export default isValid
