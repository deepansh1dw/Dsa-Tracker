
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
function App() {
  

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" >
     

      <Routes>
         <Route path="/" element={<HomePage />} />
      </Routes>


      
    </div>
  );
}

export default App;