
// password
export var passwordMinLength: number = 8;
export var passwordMaxLength: number = 12;
export var passwordRegex: RegExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/);

export var usernameMinLength: number = 5;
export var usernameMaxLength: number = 25;

export var validationData: { [key: string]: { [type: string]: any[] } } = {
    ['username']: {
        ['required']: [true, 'Username is required'],
        ['minlength']: [8, 'Username min length is 8'],
        ['maxlength']: [12, 'Username max length is 12'],
    },
    ['password']: {
        ['required']: [true, 'Password is required'],
        ['minlength']: [8, `Password min length is ${passwordMinLength}`],
        ['maxlength']: [12, `Password max length is ${passwordMaxLength}`],
        ['pattern']: [new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/), 'Must have at least one uppercase, lowercase, special character, and number']
    },
    ['newPassword']: {
        ['required']: [true, 'New password is required'],
        ['minlength']: [8, `Password min length is ${passwordMinLength}`],
        ['maxlength']: [12, `Password max length is ${passwordMaxLength}`],
        ['pattern']: [new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/), 'Must have at least one uppercase, lowercase, special character, and number']
    }
};




// export function validatePassword(control: FormControl) {   
//     if (passwordRegex.test(control.value)) {
//         return null;
//     } else {
//         return { 'validatePassword': true }
//     }
// }
