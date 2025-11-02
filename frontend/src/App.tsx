import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import { authProvider } from "./auth/authProvider";
import { dataProvider } from "./dataProvider";
import { Layout } from "./Layout";
import { LandingPage } from "./pages/LandingPage";
import { LocationCreate, LocationList, LocationShow } from "./pages/Location";
import { Signup } from "./pages/Signup";
import { theme } from "./theme";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    theme={theme}
  >
    <CustomRoutes noLayout>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LandingPage />}></Route>
    </CustomRoutes>
    <Resource
      name="locations"
      list={LocationList}
      show={LocationShow}
      create={LocationCreate}
    />
  </Admin>
);
