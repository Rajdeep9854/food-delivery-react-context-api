import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';

const Meals = () => {

    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(()=>{
        async function fetchMeals(){
        const response = await fetch('http://localhost:3000/meals');
        if(!response.ok){

        }
        const meals=await response.json();
        console.log(meals);
        setLoadedMeals(meals)
        
        }
        fetchMeals();
        //console.log(loadedMeals);
    },[])
    
return (
    <ul id='meals'>
        {
            loadedMeals.map((mealItem)=>{
                return <MealItem  key={mealItem.id}  meal={mealItem} />
            }
            )
        }
    </ul>
  )
}

export default Meals