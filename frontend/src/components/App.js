import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

import PrivateRoute from "./PrivateRoute";
import useFindUser from "../hooks/useFindUser";
import { UserContext } from "../hooks/UserContext";

// Material UI
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// UI Component
import theme from "./ui/Theme";
import Footer from "./ui/Footer";

function App() {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <UserContext.Provider value={{ user, setUser, isLoading }}>
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </UserContext.Provider>
        </Router>
        <Footer />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
