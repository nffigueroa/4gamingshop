import {
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  styled,
} from '@material-ui/core';

const MenuStyles = makeStyles((theme) => ({
  title: {
    color: '#333',
    fontSize: '16px',
  },
  label: {
    fontSize: '14px',
    color: '#666',
  },
}));

const ListItemStyled = styled(ListItem)(() => ({
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export interface MenuItem {
  func: Function;
  txt: string;
}

export const MenuComponent = ({ list }) => {
  const classes = MenuStyles();
  return (
    <>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader
            className={classes.title}
            component='div'
            id='nested-list-subheader'
          >
            Categorias
          </ListSubheader>
        }
      >
        {list.map((item: MenuItem) => (
          <ListItemStyled button onClick={() => item.func()}>
            <span className={classes.label}>{item.txt} </span>
          </ListItemStyled>
        ))}
      </List>
    </>
  );
};
