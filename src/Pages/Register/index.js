import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Box, Button, Icon, Paper } from '@material-ui/core';
import * as Yup from 'yup';
import CustomTextField from 'Componentes/forms/CustomTextField';
import { styles } from './styles';
import api from 'Services/Api';
import CustomMaskField from 'Componentes/forms/CustomMaskField';
import moment from 'moment';

const Register = () => {
  const classes = styles();

  const [empty, setEmpty] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit = async ({ name, surname, email, birthdate, password }) => {
    const response = await api.post('/users', {
      name,
      surname,
      email,
      birthdate,
      password,
    });
    console.log(response);
    return response;
  };

  const initialValues = {
    name: '',
    surname: '',
    email: '',
    birthdate: '',
    password: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('campo obrigatório'),
    surname: Yup.string().required('campo obrigatório'),
    email: Yup.string().email('Email inválido').required('campo obrigatório'),
    birthdate: Yup.mixed()
      .test('valid-date', 'Por Favor, insira uma data válida', (val) =>
        moment(val, 'DD/MM/YYYY')
          .max(new Date(val), "You can't be born in the future!")
          .isValid()
      )
      // .date()

      .required('campo obrigatório'),
    password: Yup.string().required('campo obrigatório'),
  });

  return (
    <Container>
      <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <h1>Registre-se</h1>
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
                label="Nome"
                name="name"
                style={{ width: '100%' }}
                component={CustomTextField}
                className={classes.inputContainer}
              />
              <Field
                label="Sobre Nome"
                name="surname"
                style={{ width: '100%' }}
                component={CustomTextField}
                className={classes.inputContainer}
              />
              <Field
                label="Email"
                type="email"
                name="email"
                style={{ width: '100%' }}
                component={CustomTextField}
                className={classes.inputContainer}
              />
              <Field
                label="Data de Nascimento"
                name="birthdate"
                style={{ width: '100%' }}
                mask="99/99/9999"
                component={CustomMaskField}
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

              <div
                style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Criar Conta
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
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

export default Register;
