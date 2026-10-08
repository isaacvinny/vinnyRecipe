import "../css/FrontPage.css"
import { useState } from "react"
import { Link } from "react-router-dom"

function FrontPage(){
    const [modalOpen, setmodalOpen] = useState(false);

    function handleModalOpen(){
        setmodalOpen(!modalOpen);
    }

    if(modalOpen) {
    document.body.classList.add('active-modal')
    } else {
    document.body.classList.remove('active-modal')
    }

    return(
        <div className="frontpage">
            <div className="front-text">
                <h1>Vinnys' Food Recipe app</h1>
                <h3>A recipe has no soul, you as the cook must bring soul to the recipe... <br/>"Good food, Good mood."</h3>
                <button className="frontpage-btn" onClick={handleModalOpen}>Get Started</button>
            </div>
            {modalOpen && (
                <div className="front-modal">
                    <div className="overlay" onClick={handleModalOpen}></div>
                    <div className="modal-content">
                        <h2>Welcome to Vinnys' Food Recipe app!</h2>
                        <div className="modal-text">
                            <p>Discover delicious recipes and create your own!</p>
                            <p>This is an AI recipe generator, it is an interactive, intelligent tool that creates customized cooking recipes instantly. By inputting available ingredients, dietary restrictions (e.g., vegan, keto), or cuisine preferences, the AI generates tailored recipes, step-by-step instructions, and nutritional information, aiming to reduce food waste and simplify meal planning.</p>
                            <p><b>HAPPY COOKING!</b></p>
                        </div>
                        <div className="btn-container">
                            <button className="modal-btn" onClick={handleModalOpen}>Close</button>
                            <button className="modal-btn"><Link to="/Homepage" className="modal-link">Explore Recipes</Link></button>
                        </div>
                    </div>
                </div>
            )}
                
        </div>
    )
}
export default FrontPage