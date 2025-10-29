import { List, Datagrid, TextField, NumberField, ChipField } from 'react-admin';

export const LocationList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="city" />
      <TextField source="state" />
      <NumberField source="capacity" />
      <NumberField source="price_range" />
      <NumberField source="final_rating" />
      <ChipField source="status" />
    </Datagrid>
  </List>
);
