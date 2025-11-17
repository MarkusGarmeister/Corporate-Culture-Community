import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import { authProvider } from "./auth/authProvider";
import { dataProvider } from "./dataProvider";
import { Layout } from "./Layout";
import { LandingPage } from "./pages/LandingPage";
import {
  LocationCreate,
  LocationList,
  LocationShow,
} from "./pages/location/index.tsx";
import { theme } from "./theme";
import { SignupCompleted } from "./pages/SignupCompleted";
import { NotFound } from "./pages/404NotFound";
import { Welcome } from "./pages/Welcome";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Imprint } from "./pages/Imprint";
import { UserList } from "./pages/User/index.tsx";
import { UserProfilePage } from "./pages/UserProfile.tsx";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    theme={theme}
    catchAll={NotFound}
    loginPage={false}
  >
    <Resource
      name="locations"
      list={LocationList}
      show={LocationShow}
      create={LocationCreate}
    />
    <Resource name="users" list={UserList} show={UserProfilePage} />
    <CustomRoutes noLayout>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup/success" element={<SignupCompleted />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/imprint" element={<Imprint />} />
    </CustomRoutes>
  </Admin>
);
