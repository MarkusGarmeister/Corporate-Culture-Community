import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { authProvider } from "./auth/authProvider";
import { Signup } from "./pages/Signup";

export const App = () => (
  <Admin layout={Layout} authProvider={authProvider}>
    <CustomRoutes noLayout>
      <Route path="/signup" element={<Signup />} />
    </CustomRoutes>
    <Resource
      name="venues"
      list={() => <div>Venue Marketplace</div>}
    ></Resource>
  </Admin>
);
