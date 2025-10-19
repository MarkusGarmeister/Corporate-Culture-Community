import { Admin, Ressource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./auth/authProvider";

export const App = () => (
  <Admin layout={Layout} authProvider={authProvider}>
    <Ressource
      name="venues"
      list={() => <div>Venue Marketplace</div>}
    ></Ressource>
  </Admin>
);
