import { List, ListItem, ListSubheader, makeStyles } from '@material-ui/core';

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
          <ListItem button onClick={() => item.func()}>
            <span className={classes.label}>{item.txt} </span>
          </ListItem>
        ))}
      </List>
    </>
  );
};
