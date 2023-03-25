//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––– General Login & Registration Functions ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
export function popUp_warning(errorMessage) {
    var warningModal = new bootstrap.Modal(document.getElementById('warningModal'))
    document.getElementById("error-msg").textContent = errorMessage;
    warningModal.show();
}


// check if email has correct format 
export function validation_email(email) {
    const isValid_email = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);
    if (isValid_email === false) {
        return false;
    };
};
// check name should be letters only
export function validation_name(name) {
    const name_regex = /^[A-Za-z\s]+$/;
    const isValid_name = name_regex.test(name);
    if (isValid_name == false) {
        return false;
    }
};
// check for password confirmation 
export function validation_password(password) {
    const space_regex = /^\S+$/;
    const isValid_password = space_regex.test(password);
    if (isValid_password == false) {
        return false;
    };
};