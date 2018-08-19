export class RegisterInput {
    constructor(
        public email: string = '',
        public name: string = '',
        public avatar: string = '',
        public password: string = '',
        public repeatPassword: string = '' 
    ) { }
}