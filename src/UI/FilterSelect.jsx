import React from "react";
import { Select } from "antd";

const { Option } = Select;

const FilterSelect = ({ filterType, defaultValue, options, onChange }) => {
  return (
    <Select
      defaultValue={defaultValue}
      className="border-0"
      style={{ width: 125, marginRight: "20px" }}
      onChange={(value) => onChange(filterType, value)}
      variant={false}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSelect;
