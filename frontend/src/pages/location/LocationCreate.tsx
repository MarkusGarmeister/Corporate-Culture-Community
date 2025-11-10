import { Create } from "react-admin";
import { AddLocation } from "../AddLocation";

export const LocationCreate = () => (
  <Create
    sx={{
      "& .RaCreate-main": {
        marginTop: 0,
        paddingTop: 0,
      },
    }}
  >
    <AddLocation />
  </Create>
);
