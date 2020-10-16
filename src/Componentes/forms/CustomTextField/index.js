import React from "react";
import { TextField, FormHelperText } from "@material-ui/core";
import { ErrorMessage } from "formik";
import styled from "styled-components";

const InputContainer = styled.div`
margin-top: 20px;
margin-bottom: 20px;
`;

const CustomTextField = ({
  field,
  label,
  form: { touched, errors },
  ...props
}) => {
  return (
    <InputContainer>
      <TextField
        {...field}
        {...props}
        placeholder={label}
        error={Boolean(touched[field.name] && errors[field.name])}
        variant="outlined"
      />
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </InputContainer>
  );
};
export default CustomTextField;
