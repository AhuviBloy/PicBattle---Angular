export class Admin{
    constructor(
        public userId:number,
        public name:string,
        public email:string,
        public passwordHash :string,
        public isDeleted?:boolean 
    ){}
}
