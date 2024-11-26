export class StudentEntity{
    constructor(
        public id: number,
        public name: string,
        public nationality: string,
        public career: string,
        public password: string,
        public phone? : string,
        public age?: number,
    ){}

    
}

