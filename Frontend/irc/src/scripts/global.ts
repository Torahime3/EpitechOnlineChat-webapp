let userInformation: any[] = [];

export function storeUserInformation(userInfo: any) {
    userInformation = userInfo;
}

export function getUserInformation(): any[] {
    return userInformation;
}

