import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import clsx from 'clsx'
import React, { useState } from 'react'
import Image from 'next/image'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const CardComponentClasses = makeStyles((theme: Theme) =>
  createStyles({
    'container-card': {
      width: '100%',
      display: 'inline',
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        width: '30%',
        marginRight: '10px',
      },
      [theme.breakpoints.up('md')]: {
        width: '20%',
      },
    },
    title: {
      fontSize: '14px',
      width: 'auto',
      height: '40px',
      [theme.breakpoints.up('sm')]: {
        height: '80px',
      },
      [theme.breakpoints.up('md')]: {
        height: '55px',
      },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    card: {
      [theme.breakpoints.up('md')]: {},
      marginBottom: '20px',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
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
      <Box bgcolor="success.main" color="primary.contrastText" p={1}>
        <span>VER EN TIENDA</span>
        <ShoppingCartIcon />
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
      <Card className={classes.card}>
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
            $ {new Intl.NumberFormat().format(price)}
          </Typography>
          <CardActions
            style={{ height: '5px', marginTop: '-20px' }}
            disableSpacing
          >
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: hover,
              })}
              onClick={() => {
                setHover(!hover)
              }}
              aria-expanded={hover}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={hover} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" component="p">
                Vendedor: {seller}
              </Typography>
              <Typography variant="body2" component="p">
                Categoria: {category}
              </Typography>
            </CardContent>

            {/* <CardActions style={{ position: 'absolute', bottom: '40px' }}>
            <ShoppingCartIcon />
          </CardActions>
          */}
            <RedirectBottom url={url} />
          </Collapse>
        </CardContent>
      </Card>
    </section>
  )
}

export default CardComponent
