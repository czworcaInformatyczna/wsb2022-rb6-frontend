import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { AssetsProps, AssetsState } from "./domain";
import { DataGrid } from '@mui/x-data-grid';
import testData from "./testData.json"


class Assets extends React.Component<AssetsProps, AssetsState> {
    state = { 
        loading: true,
        assets:[],
     }
     componentDidMount(): void {
         this.setState({
            assets:testData,
            loading:false
         })
     }
    render() {
        return (
            <Box >
                {this.state.loading&& <Box>Loading</Box>}
                {!this.state.loading && <Grid container spacing={0} direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: '75px' }}>
                    <Grid xl={9} lg={9} md={9} sm={6} xs={6}  >
                        <Typography ml={2} variant="h4">Assets</Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={6} >
                        <Box mr={2} display="flex" justifyContent="end">
                            <Button size="medium" variant="outlined" color="success" >
                                Add new
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <DataGrid autoHeight
                        columns={[{ field: 'id' ,width: 90 }, { field: 'name',width: 200 },{ field: 'image' },{ field: 'serial',width: 200 },{ field: 'model',width: 200 },{ field: 'manufacturer',width: 200 },{ field: 'category' },{ field: 'status',width: 200 }]}
                            rows={this.state.assets} />

                    </Grid>

                </Grid>}
            </Box>
        );
    }
}

export default Assets;