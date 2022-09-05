import { Box } from "@mui/material";
import React from "react";
import { AssetsProps, AssetsState } from "./domain";


 
class Assets extends React.Component<AssetsProps, AssetsState> {
    state = {test:"string"  }
    render() { 
        return ( 
            <Box>TEST</Box>
         );
    }
}
 
export default Assets;