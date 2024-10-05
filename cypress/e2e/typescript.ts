function message(mess: string): void {
    console.log(mess);
}

let userName: string = 'nANMR' ;
function getMessage(mes: string): string {
    return mes + userName;

}

interface User {
    name: string;
    age: number;
}

type User2 = {
    name: string;
    age: number;
}

const user: User = {
    name : 'James',
    age: 22
}

const user2: User2 = {
    name : 'James',
    age: 22
}