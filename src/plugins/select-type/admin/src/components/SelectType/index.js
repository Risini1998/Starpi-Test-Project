import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import Select from 'react-select';
import { Stack } from '@strapi/design-system';

const SelectType = ({
  attribute,
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) => {
  const { formatMessage } = useIntl();

  const [options, setOptions] = useState([]);
  // const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // useEffect(()=>{
  //   console.log(entry)
  // }, [entry])

  useEffect(() => {
    // Fetch the restaurants from the Strapi API
    fetch('http://localhost:1337/api/restaurants')
      .then(response => response.json())
      .then(data => {
        const selectOptions = data.data.map(restaurant => ({
          value: restaurant.attributes.Name,
          label: restaurant.attributes.Name, // Assuming 'name' is a field in your restaurant content type
        }));
        setOptions(selectOptions)
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, [])

  useEffect(() => {
    console.log('options', options)
    console.log('attribute', attribute,
      'description', description,
      'disabled', disabled,
      'error', error,
      'intlLabel', intlLabel,
      name,
      onChange,
      placeholder,
      required,
      value)
  }, [options])

  const handleSelectChange = (event) => {
    console.log('event', event)
    onChange({ target: { name, value: event.value, type: attribute.type } })
  }

  return (
    <Stack Stack spacing={1}>
      <label>
        {intlLabel ? formatMessage(intlLabel) : ''}
        <Select
          name={name}
          isDisabled={disabled}
          value={value.value}
          onChange={handleSelectChange}
          options={options}
          required={required}
          placeholder={placeholder ? formatMessage(placeholder) : ''}
        />
        {description ? formatMessage(description) : ''}
      </label>
    </Stack>
  );

};
export default SelectType;