import React from 'react'
import FoodItemCard from '../FoodItemCard/FoodItemCard';
import './FoodSamples.scss';
import { FoodGroupCategory, OneUnitServingExample } from '../../api';
import { getRandomItemsFromArray } from '../../api/utils';
import { STRING_CONSTANTS } from '../Strings.const';
import useBreakpoint, { Breakpoints } from '../hooks/useBreakpoint';

interface Props {
    foodGroupCategories: FoodGroupCategory[];
}

const SAMPLE_SIZE_PER_CATEGORY = {
    sm: 3,
    md: 6,
    lg: 9,
    xl: 12
};

const FoodSamples: React.FC<Props> = ({ foodGroupCategories }) => {
    const Breakpoint: Breakpoints = useBreakpoint();
    
    return (
        <div className="food-samples">
            <h4 className="food-samples-title">{STRING_CONSTANTS.SampleOneUnitServings}</h4>
            {foodGroupCategories.map((category) => (
                <div key={category.id} className="food-group-category">
                    <span className="category-name">{category.name}</span>
                    <div className="food-items">
                        {getRandomItemsFromArray(category.oneUnitServingExamples, Math.min(category.oneUnitServingExamples.length, SAMPLE_SIZE_PER_CATEGORY[Breakpoint],)).map((food: OneUnitServingExample, key: React.Key) => (
                            <FoodItemCard key={key} name={food.foodName} imgUrl={food.imageUrl} servingSize={food.servingSize} categoryId={category.id} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodSamples