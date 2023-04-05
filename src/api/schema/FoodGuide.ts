
export interface FoodGroupCategories {
    id: string;
    name: string;
}

export interface ServingsGuideEntry {
    foodGroupID: string;
    sex: string;
    ageRange: string;
    servings: number;
}

export interface OneUnitServingExample {
    foodGroupID: string;
    foodGroupCategoryID: number;
    servingSize: string;
    food: string;
    imageUrl?: string;
}

export interface FoodGroup {
    id: string;
    name: string;
    directionalStatemments: string[];
    categories: FoodGroupCategories[];
    servingsGuide: ServingsGuideEntry[];
    oneUnitServingExamples: OneUnitServingExample[];
}