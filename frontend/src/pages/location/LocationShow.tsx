import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ChipField,
  ArrayField,
  SingleFieldList,
  useRecordContext,
} from 'react-admin';
import { RatingSection } from '../../components/RatingSection';

const RatingSectionWrapper = () => {
  const record = useRecordContext()
  return(
    <RatingSection locationId={record?.id ?? 0} />
  )
  
}

export const LocationShow = () => {
  
  return (  
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
        <RatingSectionWrapper/>
      </SimpleShowLayout>
    </Show>
  )
}