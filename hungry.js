
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
.then((res) => res.json())
.then((data) => {
    const foods=data.meals;
    // console.log(data.meals);
    const allFoods=document.getElementById('all-foods');
   foods.map(foods=> {
        // const meals = foods[i];
        // console.log(meals.strMeal);
        const foodsDiv=document.createElement('div');
        const foodName=foods.strMeal;
        const foodImg=foods.strMealThumb;
        const foodId=foods.idMeal;
        foodsDiv.innerHTML=`
        <div onclick="getMealDetails(${foodId})" class="food-card" class="card" style="width: 18rem;">
          <img src="${foodImg}" class="card-img-top" alt="...">
           <div class="card-body">
               <h5 class="food-image">${foodName}<br></h5>
           </div>
        </div>
        `
        allFoods.appendChild(foodsDiv);

       

        
    }
   )
});






const getSearchValue = () => {
  const searchValue = document.getElementById("search_input").value;
  if (!searchValue) {
    document.getElementById("search-all-food").innerHTML =
      "<h1>Please type your food name!</h1>";
  } 
  else {
    document.getElementById("search-all-food").innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const food = data.meals;
      food.map((food) => {
        const row = document.getElementById("search-all-food");
        const foodContainer = document.createElement("div");
        foodContainer.setAttribute("class", "col col-style");
        const foodName = food.strMeal;
        const foodImg = food.strMealThumb;
        const foodId = food.idMeal;

        const foodDiv = ` <div onclick="getMealDetails(${foodId})" class="food-card" class="card" style="width: 18rem;">
        <img src="${foodImg}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="food-image">${foodName}<br></h5>
         </div>
      </div>`;
          foodContainer.innerHTML = foodDiv;
          row.appendChild(foodContainer);
          document.getElementById("all-foods").innerHTML="";
      });
    })
    .catch((error) => {
      document.getElementById("search-all-food").innerHTML="<h1>Wrong! please try again.</h1>";
    });
  }
};




const getMealDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals;
      meal.map((element) => {
        const foodImg = element.strMealThumb;
        const foodDetailsContainer = document.createElement("div");
        const foodDetailsDiv = `<div class="details card p-4 w-75 shadow-lg rounded-3" > <img id="img-details" src="${foodImg}" alt="Food Card image>
            <div class="card-body"">
            <h4 class="card-title">${element.strMeal}</h4>
            <h5>Ingredient</h5>
            <h6 class="card-text"> 1. ${element.strIngredient1}</h6> <h6 class="card-text"> 2. ${element.strIngredient2}</h6>
            <h6 class="card-text"> 3. ${element.strIngredient3}</h6> <h6 class="card-text"> 4. ${element.strIngredient4}</h6> 
            <h6 class="card-text"> 5. ${element.strIngredient5}</h6> <h6 class="card-text"> 6. ${element.strIngredient6}</h6>
            <h6 class="card-text"> 7. ${element.strIngredient7}</h6> <h6 class="card-text"> 8. ${element.strIngredient8}</h6>
            <h6 class="card-text"> 9. ${element.strIngredient9}</h6> <h6 class="card-text"> 10. ${element.strIngredient10}</h6>
            <button class="btn btn-info"  onclick="backHome()" id="back-search"> < Back</button>
            </div>
         </div>`;
        foodDetailsContainer.innerHTML = foodDetailsDiv;
        document
          .getElementById("search-food")
          .appendChild(foodDetailsContainer);
        document.getElementById("all-food").style.display = "none";
      });
    });
};



const backHome = () => {
  document.getElementById("all-food").style.display = "block";
  document.getElementById("search-food").innerHTML = "";
  document.getElementById("search-all-food").innerHTML = "";
  document.getElementById("search_input").value = "";
};