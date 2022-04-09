import React from 'react';
import './App.scss';
import AppRouter from './AppRouter';
import AppSnackbar from "./AppSnackbar";
import {Grid} from "@mui/material";
import Settings from "../Settings/Settings";


function App(): JSX.Element {

  return (
      <div className="app-root">
          <Grid container spacing={2}>
              <Grid item xs={1} sm={1} md={2} lg={2} xl={2}></Grid>
              <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
                  <AppRouter></AppRouter>
                  <AppSnackbar></AppSnackbar>
                  <Settings></Settings>
              </Grid>
              <Grid item xs={1} sm={1} md={2} lg={2} xl={2}></Grid>
          </Grid>
      </div>
  );
}

export default App;
