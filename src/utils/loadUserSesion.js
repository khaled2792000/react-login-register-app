export function load_user_session(current_user) {
    const usersList = JSON.parse(localStorage.getItem("users"));
    if (usersList) {
        let userDetails = usersList.find(user => {
            return user.username == current_user.username
        })
        if (userDetails && userDetails.password == current_user.password) {
            sessionStorage.setItem("user", JSON.stringify(userDetails));
            return userDetails;
        }
        else {
            throw new Error('something went wrong check your username and password')
        }
    }
    else {
        throw new Error('something went wrong check your username and password')
    }
}