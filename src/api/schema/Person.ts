
export interface Person {
    name: string;
    ageRange: string;
    sex: string;
}

export interface Family {
    name: string;
    members: Person[];
}