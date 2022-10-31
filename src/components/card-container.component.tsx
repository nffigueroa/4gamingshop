import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React, { memo } from 'react';
import { ItemProduct } from '../interfaces/ItemProduct';
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

export const CardContainerComponent = (props: {
  resultList: ItemProduct[];
}) => {
  const { resultList } = props;
  console.log(resultList);
  const classes = CardContainerClasses();
  return (
    <section className={classes['cards-container']}>
      {resultList.map(
        (
          { name, value, seller: { name: sellerName }, image, url },
          index: number
        ) => (
          <CardComponent
            key={index}
            title={name}
            price={value}
            seller={sellerName}
            img={image}
            url={url}
          />
        )
      )}
    </section>
  );
};
