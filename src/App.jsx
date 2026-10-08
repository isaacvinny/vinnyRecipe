import FrontPage from "./Pages/FrontPage.jsx"
import { Routes, Route } from "react-router-dom"
import Homepage from "./Pages/Homepage.jsx"


function App() {
  return (
    <>
      <Routes>  
        <Route path="/" element={<FrontPage />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App