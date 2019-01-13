let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

module.exports.emailValidators = [
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
];

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 12) {
            return false;
        } else {
            return true;
        }
    }
};

let validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/);
        return regExp.test(password);
    }
};

module.exports.passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters but no more than 12'
    },
    {
        validator: validPassword,
        message: 'Must have at least one uppercase, lowercase, special character, and number'
    }
];

let validTelephone = function (telephone) {
    if (!telephone) {
        return false;
    } else {
        const regExp = new RegExp(/^[0-9]*$/);
        return regExp.test(telephone);
    }
}

module.exports.telephoneValidators = [
    {
        validator: validTelephone,
        message: 'Telephone can containt only digits'
    }
];

let validYear = function (year) {
    if (!year) {
        return false;
    } else {
        const regExp = new RegExp(/[1-5]{1}/);
        return regExp.test(year);
    }
}

module.exports.yearValidators = [
    {
        validator: validYear,
        message: 'Year must be between 1 and 5'
    }
];

let validWebsite = function (webSite) {
    if (!webSite) {
        return false;
    } else {
        const regExp = new RegExp(/^((?:http(?:s)?\:\/\/)?[a-zA-Z0-9_-]+(?:.[a-zA-Z0-9_-]+)*.[a-zA-Z]{2,4}(?:\/[a-zA-Z0-9_]+)*(?:\/[a-zA-Z0-9_]+.[a-zA-Z]{2,4}(?:\?[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)?)?(?:\&[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)*)$/);
        return regExp.test(webSite);
    }
};

module.exports.webSiteValidators = [
    {
        validator: validWebsite,
        message: 'Must be a valid web site address'
    }
];

let pibLengthChecker = (pib) => {
    if (!pib) {
        return false;
    } else {
        if (pib.length != 8) {
            return false;
        } else {
            return true;
        }
    }
};

let validPib = (pib) => {
    if (!pib) {
        return false;
    } else {
        const regExp = new RegExp(/^[0-9]{8}$/);
        return regExp.test(pib);
    }
};

module.exports.pibValidators = [
    {
        validator: pibLengthChecker,
        message: 'Pib must have 8 digits'
    },
    {
        validator: validPib,
        message: 'Pib can only contain digits'
    }
];