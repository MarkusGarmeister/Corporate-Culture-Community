import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ChipField,
  ArrayField,
  SingleFieldList,
} from 'react-admin';

export const LocationShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ChipField source="status" />
      <TextField source="address_line_1" label="Address Line 1" />
      <TextField source="address_line_2" label="Address Line 2" />
      <TextField source="city" />
      <TextField source="state" />
      <TextField source="zip_code" label="Zip Code" />
      <TextField source="country" />
      <NumberField source="capacity" />
      <NumberField source="price_range" label="Price Range" />
      <NumberField source="final_rating" label="Rating" />
      <ArrayField source="labels">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
