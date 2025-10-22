import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { authProvider } from "./auth/authProvider";
import { Signup } from "./pages/Signup";
import { VenueList } from "./components/VenueList";
import { dataProvider } from "./dataProvider";
import { VenueFilter } from "./components/VenueFilter";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <CustomRoutes noLayout>
      <Route path="/signup" element={<Signup />} />
    </CustomRoutes>
    <Resource name="venues" list={VenueList}></Resource>
  </Admin>
);
