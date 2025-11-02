import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
} from "react-admin";

export const LocationCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
      <TextInput
        source="address_line_1"
        label="Address Line 1"
        validate={[required()]}
        fullWidth
      />
      <TextInput
        source="address_line_2"
        label="Address Line 2 (Optional)"
        fullWidth
      />
      <TextInput source="city" validate={[required()]} />
      <TextInput source="state" validate={[required()]} />
      <TextInput source="zip_code" label="Zip Code" validate={[required()]} />
      <TextInput source="country" validate={[required()]} />
      <NumberInput source="capacity" validate={[required()]} />
      <NumberInput
        source="price_range"
        label="Price Range (1-5)"
        validate={[required()]}
        min={1}
        max={5}
      />
    </SimpleForm>
  </Create>
);
