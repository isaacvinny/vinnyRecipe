import React, { useState } from "react"
import Navbar from "../Components/Navbar"
import ReactMarkdown from "react-markdown";
import "../css/Homepage.css"

function Homepage(){

    const [ingredientInput, setIngredientInput] = useState([])
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    function formHandler(formData){
        const newIngredientInput = formData.get("ingredient-box").trim()
        if (!newIngredientInput) return;
        setIngredientInput(prevIngredientInput => [...prevIngredientInput, newIngredientInput])
    }

    async function getRecipe() {

    setLoading(true);
    setRecipe("");

    try {

        const response = await fetch(
            "http://localhost:5000/api/generate-recipe",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    ingredients: ingredientInput
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.error || "Something went wrong"
            );
        }


        setRecipe(data.recipe);


    } catch (error) {

        console.error("Recipe Error:", error);

        setRecipe(
            `Sorry, I couldn't generate a recipe.\n\n**Error:** ${error.message}`
        );


    } finally {

        setLoading(false);

    }
}

    return(
        <>
            <Navbar />
            <div className="container">
                <div className="page-content">
                    <form action={formHandler}>
                        <input className="ingre-input" name="ingredient-box" type="text" placeholder="e.g Rice" />
                        <button className="add-btn">Add ingredient</button>
                    </form>

                    <ul className="page-ul">
                        <h3>Ingredients on hand:</h3>
                        {ingredientInput.map((lists, index) => (
                            <li key={index}>{lists}</li>
                        ))}
                    </ul>

                    {ingredientInput.length > 3 && 
                    <div className="getRecipe-box-containter">
                        <div className="getRecipe-box">
                            <div className="getRecipe-box-text">
                                <h5>Ready for recipe?</h5>
                                <h5>Generate a recipe from your list of ingredients.</h5>
                            </div>
                            <div className="getRecipe-box-button">
                                <button onClick={getRecipe} disabled={loading}> {loading ? "Generating..." : "Get a recipe"} </button>
                            </div>
                        </div>
                    </div>}

                    {recipe && (
                        <div className="recipe-container">
                            <h2>Vinny Recipe Recommends:</h2>
                                <div className="recipe-content">
                                    <ReactMarkdown>
                                        {recipe}
                                    </ReactMarkdown>
                                </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
export default Homepage