import { Show } from "react-admin";
import { LocationDetailCard } from "../../components/location/LocationDetailCard";

export const LocationShow = () => {
  return (
    <Show
      sx={{
        "& .RaShow-main": {
          marginTop: 0,
          paddingTop: 0,
        },
      }}
    >
      <LocationDetailCard />
    </Show>
  );
};
