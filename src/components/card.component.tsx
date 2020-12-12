import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'

const CardComponentClasses = makeStyles((theme: Theme) =>
  createStyles({
    'container-card': {},
    title: { fontSize: '20px' },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
)

const CardComponent = ({ title, price, seller, img }) => {
  const classes = CardComponentClasses()
  return (
    <section className={classes['container-card']}>
      <Card>
        <CardContent>
          <CardMedia className={classes.media} src={img} title="Item" />
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
            Donde ? {seller}
          </Typography>
        </CardContent>
      </Card>
    </section>
  )
}
