export class InfoTokenEntity{

    constructor (
        public id: string,
        public name: string,
        public email: string,
        public rol: string,
        public iat: number,
        public exp:number,
    ){}

    
}