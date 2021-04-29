import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { DataGrid } from "@material-ui/data-grid";

// import Vuex store
import store from "./store";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function Attribution() {
  return (
    <React.Fragment>
      <p style={{ textAlign: "center", marginBottom: "3rem" }}>
        Forked from:{" "}
        <Link href="https://github.com/mui-org/material-ui/tree/master/examples/create-react-app">material-ui.com's Create React App example</Link>
      </p>
    </React.Fragment>
  );
}

export default function App() {
  const rows = store.getters["getRows"];
  const columns = store.getters["getColumns"];

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography style={{ textAlign: "center" }} variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <Attribution />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
        <Copyright />
      </Box>
    </Container>
  );
}
