import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import React, { useState } from 'react'
import Image from 'next/image'

const CardComponentClasses = makeStyles((theme: Theme) =>
  createStyles({
    'container-card': {
      width: '100%',
      display: 'inline',
      position: 'relative',
      [theme.breakpoints.up(600)]: {
        width: '20%',
        marginRight: '10px',
      },
    },
    title: {
      fontSize: '20px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      height: '60px',
      width: 'auto',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    card: {
      [theme.breakpoints.up(900)]: {},
      marginBottom: '20px',
    },
  }),
)

const RedirectBottomStyles = makeStyles((theme: Theme) =>
  createStyles({
    'container-redirect': {
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  }),
)

const RedirectBottom = ({ url }) => {
  const classes = RedirectBottomStyles()
  return (
    <section
      className={classes['container-redirect']}
      onClick={() => (url ? (window.location.href = url) : '')}
    >
      <Box bgcolor="success.main" color="primary.contrastText" p={2}>
        VER EN TIENDA
      </Box>
    </section>
  )
}

const CardComponent = ({ title, price, seller, img, category, url }) => {
  const classes = CardComponentClasses()
  const [hover, setHover] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <section className={classes['container-card']}>
      <Card
        className={classes.card}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardContent>
          {img ? (
            <CardMedia className={classes.media} image={img} title="Item" />
          ) : (
            <Image
              src="/img/not-found.png"
              alt="Product Image"
              width={284}
              height={160}
            />
          )}
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            Precio: $ {new Intl.NumberFormat().format(price)}
          </Typography>
          <Typography variant="body2" component="p">
            Vendedor: {seller}
          </Typography>
          <Typography variant="body2" component="p">
            Categoria: {category}
          </Typography>

          {/* <CardActions style={{ position: 'absolute', bottom: '40px' }}>
            <ShoppingCartIcon />
          </CardActions>
          */}
        </CardContent>
        <Collapse in={(!!url && hover) || !matches}>
          <RedirectBottom url={url} />
        </Collapse>
      </Card>
    </section>
  )
}

export default CardComponent
