export var var1: string = 'a';
export var var2: string = 'b';
export var authUser: any = { displayName: "null" }
export var authUser2: any


export function setAuthUser(user) {
    authUser = user
}

export function getAuthUser(source) {
    console.log("from: ", source)
    return authUser
}