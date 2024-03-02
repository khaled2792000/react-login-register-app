export function add_user_to_local_storage(newUser) {
    const usersList = JSON.parse(localStorage.getItem('users'))
    if (usersList && usersList.find(user => newUser.email == user.email)) {
        throw new Error('The user is in the system use another email')
    }
    if (usersList && usersList.find(user => newUser.username == user.username)) {
        throw new Error('The user is in the system use another username')
    }
    localStorage.setItem('users', JSON.stringify([...usersList, newUser]))
}
export function update_user(newUser_values) {
    const usersList = JSON.parse(localStorage.getItem('users'))
    const allTheUserWithoutTargetUser = usersList.filter(user => user.email != newUser_values.email)
    localStorage.setItem('users', JSON.stringify([...allTheUserWithoutTargetUser, newUser_values]))
}