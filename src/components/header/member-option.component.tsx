import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
  Select,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import UserMenu from '../user-menu.component';

const HeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    'span-registrarse': {
      color: theme.palette.text.secondary,
      display: 'block',
      textAlign: 'center',
      marginBottom: '10px',
    },

    welcome: {
      fontFamily: 'OpenSans-Light',
      color: theme.palette.text.secondary,
      textAlign: 'center',
    },
  })
);
export const MemberOption = ({ tkn, fName, lName, logOutFunc }) => {
  const classes = HeaderStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      {fName && lName && tkn ? (
        <div className={classes.welcome}>
          <UserMenu name={`${fName} ${lName}`} logOutFunc={logOutFunc} />
        </div>
      ) : (
        <span className={classes['span-registrarse']}>
          <p>¿Aún no eres miembro?</p>
          <section>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push({ pathname: '/register' })}
            >
              Registrate
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant='contained'
              onClick={() => router.push({ pathname: '/login' })}
            >
              Inicia Sesion
            </Button>
          </section>
        </span>
      )}
    </>
  );
};
