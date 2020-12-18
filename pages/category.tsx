import {
  Backdrop,
  Chip,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CardComponent from '../src/components/card.component'
import withRedux from '../src/enhandcer/withRedux'
import { ItemProduct, Seller } from '../src/interfaces/ItemProduct'
import HomeTemplate from '../src/template/home.template'
import { SetProductsByCategory } from '../state/actions/inventory.actions'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'

const CategoryPageStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default,
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    'cards-container': {
      marginTop: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-around',
    },
    'chip-label': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
    },
    'container-sponsors': {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '20px 10px auto 10px',
      width: '100%',
    },
    'chip-component': {
      margin: '5px 5px',
    },
  }),
)

const CategoryPage = ({ dispatch, categorySelected, productsByCategory }) => {
  const classes = CategoryPageStyles()
  const [resultList, setResultList] = useState([])
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const handleClose = () => {
    setOpenBackDrop(false)
  }
  useEffect(() => {
    setOpenBackDrop(true)
    fetch(
      `${process.env.NEXT_PUBLIC_SEARCHPRODUCTBYCATEGORY}?categoryName=${categorySelected}`,
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(SetProductsByCategory(response))
        setResultList(response.data)
        setOpenBackDrop(false)
      })
  }, [categorySelected])
  const handleFilterByStore = (storeClicked?: Seller) => {
    if (!storeClicked) {
      setResultList(productsByCategory.data)
      return
    }
    const newListFilteresByStore = productsByCategory.data.filter(
      (item: ItemProduct) => item.seller.key === storeClicked?.key,
    )
    setResultList(newListFilteresByStore)
  }
  return (
    <section>
      <Backdrop
        className={classes.backdrop}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HomeTemplate></HomeTemplate>
      <HomeTemplate>
        <section className={classes['container-sponsors']}>
          {productsByCategory &&
          productsByCategory.sponsors &&
          productsByCategory.sponsors.length ? (
            <span className={classes['chip-label']}>Tiendas :</span>
          ) : (
            ''
          )}
          <section className={classes['chip-contaier']}>
            {productsByCategory && productsByCategory.sponsors.length
              ? productsByCategory.sponsors.map((item: Seller) => (
                  <Chip
                    className={classes['chip-component']}
                    label={item.name}
                    color="primary"
                    size="small"
                    icon={<ContactSupportIcon />}
                    onClick={() => handleFilterByStore(item)}
                  />
                ))
              : ''}

            {productsByCategory && productsByCategory.sponsors.length ? (
              <Chip
                className={classes['chip-component']}
                label={'Todos'}
                color="primary"
                size="small"
                icon={<ContactSupportIcon />}
                onClick={() => handleFilterByStore()}
              />
            ) : (
              ''
            )}
          </section>
        </section>
        <section className={classes['cards-container']}>
          {resultList && resultList.length
            ? resultList.map(
                (
                  {
                    name,
                    value,
                    seller: { name: sellerName },
                    image,
                    category,
                  },
                  index: number,
                ) => (
                  <CardComponent
                    key={index}
                    title={name}
                    price={value}
                    seller={sellerName}
                    img={image}
                    category={category}
                  />
                ),
              )
            : ''}
        </section>
      </HomeTemplate>
    </section>
  )
}

export default withRedux(CategoryPage)
