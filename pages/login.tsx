import {
  Button,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { GraphQLClient } from 'graphql-request'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import withRedux from '../src/enhandcer/withRedux'
import { AddTKN, SetUserProperties } from '../state/actions/user.actions'
const StylesLoginPage = makeStyles((theme: Theme) =>
  createStyles({
    'login-container': {
      height: '100vh',
      width: '100vw',
      [theme.breakpoints.up('md')]: {
        backgroundImage: 'url("/img/bg-1538481199.jpg")',
        width: 'auto',
        display: 'flex',
      },
    },
    'box-login': {
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
    'title-login': {
      paddingTop: '40%',

      color: theme.palette.text.primary,
      fontFamily: 'OpenSans-Light',
    },
    'text-login': {
      width: '100%',
      paddingBottom: '19px',
      '&::before': {
        content: '',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        height: '1px',
        width: '100%',
      },
    },
    'wrap-or': {
      display: 'flex',
      marginTop: '60px',
    },
    divider: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      height: '1px',
      width: '100%',
      position: 'relative',
      top: '10px',
    },
    'or-option': {
      color: theme.palette.text.primary,
      margin: '0 20px',
    },
    'login-ops-container': {},
    icon: {
      height: '18px',
      width: '18px',
    },
    'google-button': {
      backgroundColor: '#FFFFFF',
      display: 'block',
      width: '100%',
      minHeight: '56px',
      borderRadius: '100px',
      border: 0,
      marginTop: '20px',
    },
    'facebook-button': {
      backgroundColor: '#3b5998',
      display: 'block',
      width: '100%',
      minHeight: '56px',
      borderRadius: '100px',
      border: 0,
      marginTop: '20px',
    },
    'apple-button': {
      backgroundColor: '#000000',
      display: 'block',
      width: '100%',
      minHeight: '56px',
      borderRadius: '100px',
      border: 0,
      marginTop: '20px',
    },
    'label-bold-dark': {
      fontWeight: 'bold',
      fontSize: '15px',
      color: theme.palette.text.primary,
      marginLeft: '5px',
      position: 'relative',
      top: '-3px',
      fontFamily: 'OpenSans-Bold',
    },
    'label-bold-light': {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#000000',
      marginLeft: '5px',
      position: 'relative',
      top: '-3px',
      fontFamily: 'OpenSans-Bold',
    },
    'create-new-account-label': {
      color: theme.palette.text.primary,
      fontFamily: 'OpenSans-Light',
    },
  }),
)

const LoginPage = ({ tknFresh, user, userProperties, dispatch, tkn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = StylesLoginPage()
  const router = useRouter()
  console.log(userProperties)

  const handleLoginClick = () => {
    router.push({ pathname: '/login', query: { email, password } })
  }
  useEffect(() => {
    if (userProperties && tkn) {
      router.replace('/login', undefined, { shallow: true })
      router.push('/home')
    }
  }, [userProperties])
  useEffect(() => {
    if (user) {
      dispatch(SetUserProperties({ ...user }))
      dispatch(AddTKN(tknFresh))
    }
  }, [user])
  return (
    <section className={classes['login-container']}>
      <Head>
        <link rel="shortcut icon" href="/Logo4Gamer.ico" />
        <title>4Gamershop</title>
      </Head>
      <div className={classes['box-login']}>
        <Image src="/img/Logo4Gamer.png" alt="Logo" width={60} height={40} />
        <h1 className={classes['title-login']}>Inicia Sesion</h1>
        <p className={classes['create-new-account-label']}>
          Usuario nuevo?
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => router.push('/register')}
          >
            Crea una cuenta
          </span>
        </p>
        <TextField
          className={classes['text-login']}
          id="standard-basic"
          label="Correo@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes['text-login']}
          id="standard-basic"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style={{ marginTop: '10px' }}
          variant="contained"
          color="primary"
          onClick={() => handleLoginClick()}
        >
          Continuar
        </Button>
        {/*<section className={classes['wrap-or']}>
          <div className={classes.divider} />
          <section className={classes['or-option']}>Ó</section>
          <div className={classes.divider} />
        </section>
       <section className={classes['login-ops-container']}>
          <button className={classes['google-button']}>
            <svg
              viewBox="0 0 1152 1152"
              focusable="false"
              aria-hidden="true"
              role="img"
              className={classes.icon}
            >
              <path
                d="M1055.994 594.42a559.973 559.973 0 0 0-8.86-99.684h-458.99V683.25h262.28c-11.298 60.918-45.633 112.532-97.248 147.089v122.279h157.501c92.152-84.842 145.317-209.78 145.317-358.198z"
                fill="#4285f4"
              ></path>
              <path
                d="M588.144 1070.688c131.583 0 241.9-43.64 322.533-118.07l-157.5-122.28c-43.64 29.241-99.463 46.52-165.033 46.52-126.931 0-234.368-85.728-272.691-200.919H152.636v126.267c80.19 159.273 245 268.482 435.508 268.482z"
                fill="#34a853"
              ></path>
              <path
                d="M315.453 675.94a288.113 288.113 0 0 1 0-185.191V364.482H152.636a487.96 487.96 0 0 0 0 437.724z"
                fill="#fbbc05"
              ></path>
              <path
                d="M588.144 289.83c71.551 0 135.792 24.589 186.298 72.88l139.78-139.779C829.821 144.291 719.504 96 588.143 96c-190.507 0-355.318 109.21-435.508 268.482L315.453 490.75c38.323-115.19 145.76-200.919 272.691-200.919z"
                fill="#ea4335"
              ></path>
            </svg>
            <span className={classes['label-bold-light']}>
              Continuar con Google
            </span>
          </button>
          <button className={classes['facebook-button']}>
            <svg
              viewBox="0 0 36 36"
              focusable="false"
              aria-hidden="true"
              role="img"
              className={classes.icon}
              fill="white"
            >
              <path d="M2 3v30a1 1 0 0 0 1 1h16.092V21.607h-4.169v-4.828h4.17v-3.556c0-3.45 2.012-6.049 5.209-6.37a34.474 34.474 0 0 1 4.736.176v4.32h-2.565c-1.016 0-2.385.424-2.385 1.531 0 .888-.008 3.831-.008 3.9h4.782l-.622 4.83h-4.16V34H33a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"></path>
            </svg>
            <span className={classes['label-bold-dark']}>
              Continuar con Facebook
            </span>
          </button>
          <button className={classes['apple-button']}>
            <svg
              viewBox="0 0 36 36"
              focusable="false"
              aria-hidden="true"
              role="img"
              className={classes.icon}
              fill="white"
            >
              <path d="M30.911 26.729a17.913 17.913 0 0 1-1.775 3.19 16.19 16.19 0 0 1-2.285 2.762 4.438 4.438 0 0 1-2.937 1.294 7.366 7.366 0 0 1-2.714-.648 7.779 7.779 0 0 0-2.921-.646 8.042 8.042 0 0 0-3 .646 8.07 8.07 0 0 1-2.6.682 4.174 4.174 0 0 1-3-1.328 17.008 17.008 0 0 1-2.39-2.86A19.763 19.763 0 0 1 4.758 24.8 18.381 18.381 0 0 1 3.7 18.816 10.932 10.932 0 0 1 5.132 13.1a8.429 8.429 0 0 1 3.005-3.04A8.089 8.089 0 0 1 12.2 8.912a9.555 9.555 0 0 1 3.142.731 10.073 10.073 0 0 0 2.493.733 14.892 14.892 0 0 0 2.765-.863 9.143 9.143 0 0 1 3.758-.667 7.976 7.976 0 0 1 6.249 3.29 6.953 6.953 0 0 0-3.687 6.315 6.965 6.965 0 0 0 2.288 5.249 7.5 7.5 0 0 0 2.285 1.5q-.274.8-.582 1.529zM24.543 1.672a7.038 7.038 0 0 1-1.8 4.618 6.151 6.151 0 0 1-5.107 2.521 5.2 5.2 0 0 1-.038-.626 7.232 7.232 0 0 1 1.915-4.666 7.355 7.355 0 0 1 2.327-1.751 6.957 6.957 0 0 1 2.668-.756 5.862 5.862 0 0 1 .035.66z"></path>
            </svg>
            <span className={classes['label-bold-dark']}>
              Continuar con Apple
            </span>
          </button>
        </section>*/}
      </div>
    </section>
  )
}

export async function getServerSideProps({ query }) {
  if (!query) {
    return
  }
  const { email, password } = query
  const { user, tkn }: any = await fetch(
    `${process.env.LOGIN_ENDPOINT}?email=${email}&password=${password}`,
  ).then((response) => response.json())
  return {
    props: {
      user: user ?? null,
      tknFresh: tkn ?? null,
    },
  }
}

export default withRedux(LoginPage)
