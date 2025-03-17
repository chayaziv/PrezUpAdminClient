export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public jobTitle: string,
        public company: string,
        public yearsOfExperience: number,
        public compareWithOthers: boolean,
        public allowPublicPresentations: boolean,
        public accountStatus: string
    ){}
   
}