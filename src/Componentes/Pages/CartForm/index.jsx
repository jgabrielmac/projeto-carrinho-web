import React from "react";
import { Formik, Form, Field } from "formik";
import { Container, Box, Button, Icon } from "@material-ui/core";
import * as Yup from "yup";
import CustomTextField from "../../forms/CustomTextField";
import { styles } from "./styles";
import CustomMaskField from "../../forms/CustomMaskField";

const CartForm = () => {
  const classes = styles();

  const initialValues = {
    name: "",
    email: "",
    cpf: "",
    cep: "",
    street: "",
    neighborhood: "",
    number: "",
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("campo obrigatório"),
    email: Yup.string().email("Email inválido").required("campo obrigatório"),
    cpf: Yup.string().required("campo obrigatório"),
    cep: Yup.string().required("campo obrigatório"),
    street: Yup.string().required("campo obrigatório"),
    neighborhood: Yup.string().required("campo obrigatório"),
    number: Yup.number()
      .typeError("campo válido apenas com números")
      .required("campo obrigatório"),
  });

  const submit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Container>
      <Box style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <h1>Formulário de finalização</h1>
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submit}
        >
          <Form>
            <Field
              label="Nome"
              name="name"
              component={CustomTextField}
              className={classes.inputContainer}
            />
            <Field
              label="Email"
              type="email"
              name="email"
              component={CustomTextField}
              className={classes.inputContainer}
            />
            <Field
              label="CPF"
              name="cpf"
              mask="999.999.999-99"
              component={CustomMaskField}
              className={classes.inputContainer}
            />
            <Field
              label="CEP"
              name="cep"
              mask="99999-999"
              component={CustomMaskField}
              className={classes.inputContainer}
            />
            <Field
              label="Rua"
              name="street"
              component={CustomTextField}
              className={classes.inputContainer}
            />
            <Field
              label="Bairro"
              name="neighborhood"
              component={CustomTextField}
              className={classes.inputContainer}
            />
            <Field
              label="Número"
              name="number"
              component={CustomTextField}
              className={classes.inputContainer}
            />

            <Button type="submit" variant="contained" color="primary">
              Enviar
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default CartForm;
