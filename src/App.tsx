import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Drawer from './Components/drawer';
import { Box } from "@mui/material";

function App() {
  return (
   <Box>
      <BrowserRouter>
        <Drawer/>
      </BrowserRouter>
  </Box>

  )
}
export default App;
