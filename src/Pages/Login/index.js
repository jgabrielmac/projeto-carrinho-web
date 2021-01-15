import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Box, Button, Icon, Paper } from '@material-ui/core';
import * as Yup from 'yup';
import CustomTextField from 'Componentes/forms/CustomTextField';
import { styles } from './styles';
import api from 'Services/Api';

const Login = () => {
  const classes = styles();

  const [empty, setEmpty] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit = async ({ password, email }) => {
    const response = await api.get('/users', { email, password });
    if (response.data.length === 0) {
      setEmpty(true);
      setLogin(false);
      setError(false);
    }
    if (
      response.data.length > 0 &&
      response.data[0].email === email &&
      response.data[0].password === password
    ) {
      setLogin(true);
      setEmpty(false);
      setError(false);
    }
    if (
      response.data.length > 0 &&
      response.data[0].email !== email &&
      response.data[0].password !== password
    ) {
      setError(true);
      setLogin(false);
      setEmpty(false);
    }
    console.log(response);
    return response;
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const schema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('campo obrigatório'),
    password: Yup.string().required('campo obrigatório'),
  });

  return (
    <Container>
      <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <h1>Entrar</h1>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          <Form>
            <Paper style={{ padding: 30, marginTop: 12, width: 390 }}>
              <Field
                label="Email"
                type="email"
                name="email"
                style={{ width: '100%' }}
                component={CustomTextField}
                className={classes.inputContainer}
              />
              <Field
                label="Senha"
                type="password"
                name="password"
                style={{ width: '100%' }}
                component={CustomTextField}
                className={classes.inputContainer}
              />

              <Button type="submit" variant="contained" color="primary">
                Enviar
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </Paper>
          </Form>
        </Formik>

        {empty && <h2>Usuário não encontrado</h2>}
        {login && <h2>Logado com sucesso</h2>}
        {error && <h2>Email ou senha incorreto</h2>}
      </Box>
    </Container>
  );
};

export default Login;
