import { Show } from "react-admin";
import { VenueDetailCard } from "../../components/VenueDetailCard";

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
      <VenueDetailCard />
    </Show>
  );
};
