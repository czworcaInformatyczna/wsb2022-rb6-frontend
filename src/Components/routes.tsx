import { Routes, Route } from "react-router-dom";
import Assets from "./Assets/Assets";

const AppRoutes = () => {
    return (
        <Routes>
           <Route path="Assets" element={<Assets />} />
        </Routes>
    );
}

export default AppRoutes;
