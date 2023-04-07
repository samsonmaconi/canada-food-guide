import { useState, useEffect } from 'react';
import { FoodGroup, FoodGroupCategory, FoodGuideData, ServingsGuide, ServingsGuideEntry } from '../schema/FoodGuide';
import { papaPromise } from '../utils';

const foodsONPPCSV = require("../mock_data/foods-en_ONPP_rev.csv")
const foodgroupsCSV = require("../mock_data/foodgroups-en_ONPP.csv")
const servings_per_dayCSV = require("../mock_data/servings_per_day-en_ONPP.csv")
const fg_directional_satementsCSV = require("../mock_data/fg_directional_satements-en_ONPP.csv")

export const useApi = (): { data: FoodGuideData | null, isLoading: boolean, error: Error | null } => {
  const [data, setData] = useState<FoodGuideData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      parseAndTransformCSVData();
    }

    loadData();
  }, []);

  const parseAndTransformCSVData = async () => {


    try {
      // parse files
      const files = [foodgroupsCSV, fg_directional_satementsCSV, servings_per_dayCSV, foodsONPPCSV];
      const filePromises = files.map(file => papaPromise(file));
      const filesData = (await Promise.all(filePromises)).map((res: any) => res.data);

      //transform data
      const foodGroupsData = filesData[0];
      const fg_directional_satementsData = filesData[1];
      const servings_per_dayData = filesData[2];
      const foodsExamplesData = filesData[3];
      const foodGroups: { [key: string]: FoodGroup } = {};
      const foodCategories: { [key: number]: FoodGroupCategory } = {};

      foodGroupsData.forEach((entry: any) => {
        const { fgid, foodgroup, fgcat_id, fgcat } = entry;
        if (!fgid) {
          return;
        }

        const newCategory = {
          id: fgcat_id,
          name: fgcat,
          oneUnitServingExamples: []
        };
        foodCategories[fgcat_id] = newCategory;

        const newServingsGuide: ServingsGuide = {
          Male: {},
          Female: {}
        };

        if (foodGroups[fgid]) {
          foodGroups[fgid].categories.push(newCategory)
        } else {
          foodGroups[fgid] = {
            id: fgid,
            name: foodgroup,
            directionalStatemments: [],
            categories: [newCategory],
            servingsGuide: newServingsGuide,
          }
        }
      });

      fg_directional_satementsData.forEach((entry: any) => {
        const { fgid, "directional-statement": directionalStatemment } = entry;
        if (foodGroups[fgid]) {
          foodGroups[fgid].directionalStatemments.push(directionalStatemment)
        }
      });

      foodsExamplesData.forEach((entry: any) => {
        const { fgcat_id, srvg_sz, food } = entry;
        if (foodCategories[fgcat_id]) {
          foodCategories[fgcat_id].oneUnitServingExamples.push({
            foodName: food,
            servingSize: srvg_sz
          })
        }
      });

      servings_per_dayData.forEach((entry: any) => {
        const { fgid, gender, ages, servings }: { gender: 'Male' | 'Female', [key: string]: any } = entry;
        if (foodGroups[fgid]) {
          let recommendedServing = +(""+servings).split(" to ")[0] // use the smaller number as recomended bacause it's healthier
          foodGroups[fgid].servingsGuide[gender][ages.trim()] = recommendedServing;
        }
      });

      const foodGroupsArray: FoodGroup[] = Object.values(foodGroups);
      const foodGuideData: FoodGuideData = {
        foodGroupData: foodGroupsArray
      }
      setData(foodGuideData);

    } catch (error: any) {
      setError(error);
    }
    setIsLoading(false);
  }

  return { data, isLoading, error };
}