import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const CardComponentClasses = makeStyles((theme: Theme) =>
  createStyles({
    'container-card': {
      width: '100%',
      display: 'inline',
      position: 'relative',
      [theme.breakpoints.up(600)]: {
        width: '30%',
      },
    },
    title: { fontSize: '20px' },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    card: {
      height: '380px',
      maxHeight: '450px',
      marginBottom: '20px',
    },
  }),
)

const CardComponent = ({ title, price, seller, img }) => {
  const classes = CardComponentClasses()
  return (
    <section className={classes['container-card']}>
      <Card className={classes.card}>
        <CardContent>
          <CardMedia className={classes.media} image={img} title="Item" />
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            Precio: {price}
          </Typography>
          <Typography variant="body2" component="p">
            Vendedor: {seller}
          </Typography>
          <CardActions style={{ position: 'absolute', bottom: '40px' }}>
            <ShoppingCartIcon />
          </CardActions>
        </CardContent>
      </Card>
    </section>
  )
}

export default CardComponent
