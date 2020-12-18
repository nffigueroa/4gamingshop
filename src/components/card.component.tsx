import {
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
} from '@material-ui/core'
import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
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

const CardComponent = ({ title, price, seller, img, category }) => {
  const classes = CardComponentClasses()
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
      </Card>
    </section>
  )
}

export default CardComponent
