// validation for the username 
export const userNameValidation = (username) => {
    const regex = /^[A-Za-z0-9]{3,16}$/;
    return !regex.test(username) ? "Username should be 3-16 characters and shouldn't include any special character!" : ' ';
}
// validation for the password return one of the error messages 
export const passwordValidation = (password) => {
    if (!/(?=.*[0-9])/.test(password)) {
        return "Ensure that the string contains at least one digit (0-9)";
    }

    if (!/(?=.*[a-zA-Z])/.test(password)) {
        return "Ensure that the string contains at least one alphabet character"
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
        return "Ensure that the string contains at least one special character from the provided list (!@#$%^&*)"
    }

    if (!/^.{8,20}$/.test(password)) {
        return "Ensure that the length is in the range [8,20]"
    }

    return ' ';
};

// last first name validation 
export const nameStringValidation = (name) => {
    const regex = /^[A-Za-z]+$/;
    return !regex.test(name) ? "Ensure that the name contains just English letters" : ' ';
};


export const emailValidation = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !regex.test(email) ? "It should be a valid email address!" : ' ';
};

export const ageRangeValidation = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return (age < 18 || age > 120) ? "Allowed ages between 18 and 120" : ' ';
};


export const hebrewValidation = (roadName) => {
    const regex = /[\u0590-\u05FF]+(?:\s[\u0590-\u05FF.,?!:;'"״׳()-]+)*(?:\s|$)/;
    return !regex.test(roadName) ? 'Make sure it contains Hebrew characters' : ' ';
};

export const confirmPasswordValidList = (pass, confirmPass) => {
    console.log(confirmPass, pass)
    return confirmPass !== pass ? "Ensure it matches the password" : ' ';
};

export const JustPositiveNumber = (input) => {
    if (!(/^\d*$/.test(input))) {
        return 'Only positive numbers are allowed';
    }
    return ' ';
};
