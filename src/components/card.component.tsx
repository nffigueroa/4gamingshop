import {
  Box,
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
} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import withRedux from '../enhandcer/withRedux';

const CardComponentClasses = makeStyles((theme: Theme) =>
  createStyles({
    vendor: {
      fontSize: '14px',
      color: '#00a650',
      fontWeight: 'bold',
      position: 'absolute',
      bottom: '5px',
    },
    price: {
      color: '#333',
      fontSize: '24px',
      marginTop: '20px',
      textOverflow: 'ellipsis',
      maxHeight: '188px',
    },
    'container-card': {
      width: '100%',
      display: 'inline',
      position: 'relative',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        width: '30%',
        marginRight: '10px',
      },
      [theme.breakpoints.up('md')]: {
        width: '220px',
        marginLeft: '20px',
        marginTop: '20px',
        position: 'relative',
        height: 'auto',
      },
    },
    title: {
      color: '#666',
      fontSize: '14px',
      width: 'auto',
      height: '40px',
      [theme.breakpoints.up('sm')]: {
        height: '80px',
      },
      [theme.breakpoints.up('md')]: {
        height: '55px',
        marginTop: '5px',
        maxWidth: '170px',
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
      },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      borderRadius: '5px',
    },
    card: {
      background: 'white',
      [theme.breakpoints.up('md')]: {
        paddingBottom: '20px',
        height: '100%',
      },
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
  })
);

const CardComponent = ({
  title,
  price,
  seller,
  img,
  category,
  url,
  id,
  userProperties,
  onHeartClick,
}) => {
  const { [price.length - 1]: last } = price;
  const { value } = last;
  const classes = CardComponentClasses();

  const ShowHeart = () => {
    const [has, setHas] = useState(false);
    const { products } = userProperties;

    const handleClick = (flag: boolean) => {
      // false = dislike , true = like
      onHeartClick(id, flag);
    };
    useEffect(() => {
      setHas(!!products.filter((item: string) => item === id)[0]);
    }, []);
    return (
      <>
        {has ? (
          <FavoriteIcon onClick={() => handleClick(false)} />
        ) : (
          <FavoriteBorderIcon onClick={() => handleClick(true)} />
        )}
      </>
    );
  };
  return (
    <section
      className={classes['container-card']}
      onClick={() => {
        const result = confirm('Sera redirigido a la web del vendedor.');
        if (result) {
          window.open(url, '_blank');
        }
      }}
    >
      <Card className={classes.card}>
        <CardContent>
          {img ? (
            <CardMedia className={classes.media} image={img} title='Item' />
          ) : (
            <Image
              src='/img/not-found.png'
              alt='Product Image'
              width={284}
              height={160}
            />
          )}

          <Typography variant='h5' className={classes.price}>
            $ {new Intl.NumberFormat().format(value)}
          </Typography>

          <CardActions
            style={{ position: 'relative', height: '5px', marginTop: '-20px' }}
          >
            {userProperties && userProperties.firstName ? (
              <IconButton
                className={clsx(classes.expand, {})}
                onClick={() => {}}
                aria-label='Añadir a favoritos'
              >
                <ShowHeart />
              </IconButton>
            ) : (
              ''
            )}
          </CardActions>

          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {title}
          </Typography>
          <Typography component='span' className={classes.vendor}>
            {seller}
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
};

export default withRedux(CardComponent);
