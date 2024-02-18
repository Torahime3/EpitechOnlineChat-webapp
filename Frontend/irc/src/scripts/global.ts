let userInformation: any[] = [];
let userList: string[] = [];

export function storeUserInformation(userInfo: any) {
    userInformation = userInfo;
}

export function getUserInformation(): any[] {
    return userInformation;
}


//Usernames
export function storeUserList(users: string[]) {
    userList = users;
}

export function getUserList(): string[] {
    return userList;
}
