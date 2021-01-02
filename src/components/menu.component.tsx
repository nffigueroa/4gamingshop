import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
} from '@material-ui/core'
import LabelIcon from '@material-ui/icons/Label'

const MenuStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export interface MenuItem {
  func: Function
  txt: string
}

export const MenuComponent = ({ list }) => {
  const classes = MenuStyles()
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categorias
          </ListSubheader>
        }
        className={classes.root}
      >
        {list.map((item: MenuItem) => (
          <ListItem button onClick={() => item.func()}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText secondary={item.txt} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
