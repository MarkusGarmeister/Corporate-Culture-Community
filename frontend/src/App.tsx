import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./auth/authProvider";

export const App = () => (
  <Admin layout={Layout} authProvider={authProvider}>
    <Resource
      name="venues"
      list={() => <div>Venue Marketplace</div>}
    ></Resource>
  </Admin>
);
