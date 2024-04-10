// scripts.js

// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const mealDisplay = document.getElementById('mealDisplay');
    const getRandomMealButton = document.getElementById('getRandomMeal');

    // Add event listener to the button to fetch a random meal
    getRandomMealButton.addEventListener('click', getRandomMeal);

    // Function to fetch a random meal from the MealDB API
    function getRandomMeal() {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                // Get the first meal from the response data
                const meal = data.meals[0];
                // Display the meal
                displayMeal(meal);
            })
            .catch(error => {
                // Log any errors to the console
                console.error('Error fetching meal:', error);
            });
    }

    // Function to display a meal
    function displayMeal(meal) {
        // Populate the HTML with the meal information
        mealDisplay.innerHTML = `
            <div class="meal">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:300px;height:300px;">
                <h3>Ingredients:</h3>
                <ul>
                    ${getIngredients(meal).join('')}
                </ul>
                <h3>Recipe:</h3>
                <p>${meal.strInstructions}</p>
            </div>
        `;
    }

    // Function to get ingredients from a meal
    function getIngredients(meal) {
        const ingredients = [];

        // Loop through ingredients and measures
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            // If there's an ingredient, add it to the list
            if (ingredient) {
                ingredients.push(`<li>${ingredient} - ${measure}</li>`);
            } else {
                // If there's no more ingredients, exit the loop
                break;
            }
        }

        return ingredients;
    }
});
