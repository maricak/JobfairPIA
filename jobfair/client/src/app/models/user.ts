export interface User {
    username: string,
    password: string    
}

export interface ChangePasswordUser extends User {
    newPassword : string
}
