import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UserFormValidators {
    static phoneValidator(phoneControl: AbstractControl | null): ValidationErrors | null {
        let errors = {};

        if ((phoneControl?.value as string).length != 10)
          errors = {...errors, phoneLengthErr: 'should be 10 digits long'};

        let onlyNumsTest = new RegExp('^[0-9]+$');
        if (!onlyNumsTest.test(phoneControl?.value as string))
            errors = {...errors, onlyDigitsErr: 'should only contain digits 0-9'};

        if (!(phoneControl?.value as string).startsWith('9') &&
            !(phoneControl?.value as string).startsWith('7'))
          errors = {...errors, startDigitErr: 'should start with 9 or 7'};

        return Object.keys(errors).length ? errors : null;
    }

    static passwordValidator(passwordControl: AbstractControl | null): ValidationErrors | null {
        let errors = {};

        if ((passwordControl?.value as string).length < 8)
            errors = {...errors, passwordTooSmallErr: 'should be at least 8 characters long'};

        let numTest = new RegExp('.*[0-9].*');
        if (!numTest.test(passwordControl?.value as string))
            errors = {...errors, noDigitsErr: 'should contain at least 1 digit'};

        let lowerAlphaTest = new RegExp('.*[a-z].*');
        if (!lowerAlphaTest.test(passwordControl?.value as string))
            errors = {...errors, noLowerAlphaErr: 'should contain at least 1 lowercase alphabet'};

        let upperAlphaTest = new RegExp('.*[A-Z].*');
        if (!upperAlphaTest.test(passwordControl?.value as string))
            errors = {...errors, noUpperAlphaErr: 'should contain at least 1 uppercase alphabet'};

        let specialCharaTest = new RegExp('.*\\W|_.*');
        if (!specialCharaTest.test(passwordControl?.value as string))
            errors = {...errors, noSpecialCharaErr: 'should contain at least 1 special character @!#$ etc'};

        return Object.keys(errors).length ? errors : null;
    }

    static confirmPasswordValidator(confirmPasswordControl: AbstractControl | null, passwordControl: AbstractControl | null): ValidationErrors | null {
        let errors = {};

        if (confirmPasswordControl?.value as string !== passwordControl?.value as string)
            errors = {confirmPasswordMismatchErr: 'passwords do not match'};

        return Object.keys(errors).length ? errors : null;
    }
}