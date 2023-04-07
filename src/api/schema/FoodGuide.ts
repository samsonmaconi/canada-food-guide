
export const Genders = [
    "Female",
    "Male"
]

export type Sex = "Male" | "Female";

export const AgeGroups = [
    "2 to 3",
    "4 to 8",
    "9 to 13",
    "14 to 18",
    "19 to 30",
    "31 to 50",
    "51 to 70",
    "71+"
]

export interface ServingsGuide {
    [key: string]: ServingsGuideEntry;
    Male: ServingsGuideEntry;
    Female: ServingsGuideEntry;
}

export interface ServingsGuideEntry {
    [key: string]: number;
}

export interface OneUnitServingExample {
    foodName: string;
    servingSize: string;
    imageUrl?: string;
}

export interface FoodGroupCategory {
    id: number;
    name: string;
    oneUnitServingExamples: OneUnitServingExample[];
}
export interface FoodGroup {
    id: string;
    name: string;
    directionalStatemments: string[];
    categories: FoodGroupCategory[];
    servingsGuide: ServingsGuide;
}

export interface FoodGuideData {
    foodGroupData: FoodGroup[];
}