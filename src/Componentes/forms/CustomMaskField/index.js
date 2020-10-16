import React from "react";
import { TextField, FormHelperText } from "@material-ui/core";
import InputMask from "react-input-mask";
import { ErrorMessage } from "formik";
import styled from "styled-components";

const InputContainer = styled.div`
margin-top: 20px;
margin-bottom: 20px;
`;

const CustomMaskField = ({ mask, field, label, form, className, props }) => {
  return (
    <InputContainer>
      <InputMask
        {...field}
        {...props}
        maskChar={""}
        mask={mask}
        error={Boolean(form.touched[field.name] && form.errors[field.name])}
        name={field.name}
      >
        {(inputProps) => (
          <TextField
            className={className}
            placeholder={label}
            {...inputProps}
            variant="outlined"
          />
        )}
      </InputMask>
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </InputContainer>
  );
};

export default CustomMaskField;
