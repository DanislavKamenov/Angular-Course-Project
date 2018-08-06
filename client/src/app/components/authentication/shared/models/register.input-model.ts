export class RegisterInput {
    constructor(
        public email: string = '',
        public name: string = '',
        public password: string = '',
        public repeatPassword: string = '' 
    ) { }
}