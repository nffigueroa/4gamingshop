import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
} from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const StylesRegisterPage = makeStyles((theme: Theme) =>
  createStyles({
    'register-container': {
      height: '100vh',
      width: '100vw',
      [theme.breakpoints.up('md')]: {
        backgroundImage: 'url("/img/2343453245.jpg")',
        backgroundPosition: 'center',
        width: 'auto',
        display: 'flex',
      },
    },
    'title-register': {
      color: theme.palette.text.primary,
      fontFamily: 'OpenSans-Light',
      paddingTop: '20%',
    },
    'title-disclaimer': {
      color: theme.palette.text.hint,
      fontFamily: 'OpenSans-Light',
      fontSize: '14px',
    },
    'box-register': {
      padding: '10px',
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      [theme.breakpoints.up('md')]: {
        height: '690px',
        width: '514px',
        margin: 'auto',
        marginRight: '50px',
        borderRadius: '10px',
        boxShadow:
          'inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, inset 5px 5px 15px 5px rgba(0,0,0,0)',
        padding: '30px',
      },
    },
    'text-login': {
      width: '100%',
      marginBottom: '20px',
    },
    'label-check': {
      color: theme.palette.text.primary,
    },
  }),
)

const RegisterPage = ({ userCreated }) => {
  const classes = StylesRegisterPage()
  const route = useRouter()
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    sendNotifications: false,
  })
  const [snackBAr, setSnackBAr] = useState({ show: false, msg: '' })
  const handleCloseSnackbar = () => {
    setSnackBAr({ show: false, msg: '' })
  }
  const openSnackBar = (msg) => {
    setSnackBAr({ show: true, msg })
  }
  const handleButton = () => {
    const { email, firstName, lastName, password, sendNotifications } = form
    route.push({
      pathname: '/register',
      query: {
        email,
        firstName,
        lastName,
        password,
        sendNotifications,
      },
    })
  }
  useEffect(() => {
    route.replace('/register', undefined, { shallow: true })
    if (userCreated) {
      openSnackBar('Usuario creado!')
      return
    }
    openSnackBar('Ocurrio un error creando el usuario , intenta de nuevo')
  }, [userCreated])
  return (
    <section className={classes['register-container']}>
      <Snackbar
        autoHideDuration={6000}
        open={snackBAr.show}
        onClose={handleCloseSnackbar}
        message={snackBAr.msg}
      />
      <Head>
        <link rel="shortcut icon" href="/Logo4Gamer.ico" />
        <title>Registrar | 4Gamershop</title>
      </Head>
      <section className={classes['box-register']}>
        <Image src="/img/Logo4Gamer.png" alt="Logo" width={60} height={40} />
        <h1 className={classes['title-register']}>Crear una cuenta</h1>
        <p className={classes['title-disclaimer']}>
          ¿Ya tienes una cuenta?{' '}
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => route.push('/login')}
          >
            Inicia Session
          </span>
        </p>

        <FormGroup row>
          <TextField
            required
            autoComplete="off"
            className={classes['text-login']}
            id="email"
            label="Email"
            onChange={(e) =>
              setForm({ ...form, [e.target.id]: e.target.value })
            }
          />
          <TextField
            required
            autoComplete="off"
            className={classes['text-login']}
            id="firstName"
            label="Nombre"
            onChange={(e) =>
              setForm({ ...form, [e.target.id]: e.target.value })
            }
          />
          <TextField
            required
            autoComplete="off"
            className={classes['text-login']}
            id="lastName"
            label="Apellido"
            onChange={(e) =>
              setForm({ ...form, [e.target.id]: e.target.value })
            }
          />
          <TextField
            required
            autoComplete="off"
            className={classes['text-login']}
            id="password"
            label="password"
            type="password"
            onChange={(e) =>
              setForm({ ...form, [e.target.id]: e.target.value })
            }
          />
          <FormControlLabel
            className={classes['label-check']}
            control={
              <Checkbox
                id="sendNotifications"
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                onChange={(e) =>
                  setForm({ ...form, [e.target.id]: e.target.checked })
                }
              />
            }
            color="#FFFFFF"
            label="Notificarme cuando mis productos cambien de precio"
          ></FormControlLabel>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
            onClick={() => handleButton()}
          >
            ENVIAR
          </Button>
        </FormGroup>
      </section>
    </section>
  )
}

export async function getServerSideProps({ query }) {
  const { email, password, firstName, lastName, sendNotifications } = query

  const { status } = await fetch(`${process.env.REGISTER_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      sendNotifications,
    }),
  }).then((response) => response.json())

  return {
    props: {
      userCreated: status === 200,
    },
  }
}

export default RegisterPage
