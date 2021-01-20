import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Container,
  Box,
  Button,
  Icon,
  Paper,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import * as Yup from 'yup';
import CustomTextField from 'Componentes/forms/CustomTextField';
import { styles } from './styles';
import api from 'Services/Api';
import CustomMaskField from 'Componentes/forms/CustomMaskField';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const classes = styles();
  const history = useHistory();

  const [empty] = React.useState(false);
  const [login] = React.useState(false);
  const [error] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async ({ name, surname, email, birthdate, password }) => {
    const response = await api.post('/users', {
      name,
      surname,
      email,
      birthdate,
      password,
    });
    // console.log(response);
    if (response.status === 201) {
      history.push('/');
    }
    // return response;
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
        moment(val, 'DD/MM/YYYY').isValid()
      )
      .test('future-born', 'Data inválida', (val) => {
        const dataAtual = new Date();
        const data = new Date(val);
        if (data < dataAtual) {
          return true;
        } else {
          return false;
        }
      })
      .test(
        'is-of-age',
        'É necessário ser maior de idade',
        (val) => moment().diff(moment(val, 'DD/MM/YYYY'), 'year') >= 18
      )
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
                label="Sobrenome"
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
                type="date"
                name="birthdate"
                style={{ width: '100%' }}
                mask="99/99/9999"
                component={CustomMaskField}
                className={classes.inputContainer}
              />
              <Field
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                name="password"
                style={{ width: '100%' }}
                component={CustomTextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleClickShowPassword}
                    >
                      <IconButton aria-label="toggle password visibility">
                        {showPassword ? (
                          <Icon>visibility</Icon>
                        ) : (
                          <Icon>visibility_off</Icon>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
