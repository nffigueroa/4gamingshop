import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';
import CardComponent from './card.component';

const CardContainerClasses = makeStyles((theme: Theme) =>
  createStyles({
    'cards-container': {
      marginTop: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
      justifyContent: 'space-around',
      margin: '30px auto auto auto',
      [theme.breakpoints.up('md')]: {
        marginTop: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'flex-start',
        marginLeft: '50px',
      },
    },
  })
);

export const CardContainerComponent = ({ resultList }) => {
  const classes = CardContainerClasses();
  return (
    <section className={classes['cards-container']}>
      {resultList && resultList.length
        ? resultList.map(
            (
              {
                name,
                category,
                value,
                seller: { name: sellerName },
                image,
                url,
              },
              index: number
            ) => (
              <CardComponent
                key={index}
                title={name}
                price={value}
                seller={sellerName}
                img={image}
                category={category}
                url={url}
              />
            )
          )
        : ''}
    </section>
  );
};
