import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { authProvider } from "./auth/authProvider";
import { Signup } from "./pages/Signup";
import { dataProvider } from "./dataProvider";
import { LocationShow, LocationList, LocationCreate } from "./pages/Location";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <CustomRoutes noLayout>
      <Route path="/signup" element={<Signup />} />
    </CustomRoutes>
    <Resource
      name="locations"
      list={LocationList}
      show={LocationShow}
      create={LocationCreate}
    />
  </Admin>
);
