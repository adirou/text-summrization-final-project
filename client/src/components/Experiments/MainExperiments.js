import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { NewExperiment } from './NewExperiment/NewExperiment';
import TopNav from '../TopNav/TopNav';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  nested:{
    paddingLeft: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MainExperiments(props) {
  const classes = useStyles();
  const history = useHistory();
  const [showModeSelection, setShowModeSelection] = useState(false);
  
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>

        <ListItem button key={'Upload Algorithm'} onClick={e => history.push('/algorithm')}>
          <ListItemText primary={'Upload Algorithm'} />
        </ListItem>

        <ListItem button key={'Summaries'} onClick={e => history.push('/summaries')}>
          <ListItemText primary={'Summaries'} />
        </ListItem>

        <ListItem button key={'Forms'} onClick={e => history.push('/forms')}>
          <ListItemText primary={'Forms/Edit Form'} />
        </ListItem>

        <ListItem button key={'New Form'} onClick={e => history.push('/newForm')}>
          <ListItemText primary={'Create New Form'} />
        </ListItem>

        <ListItem button key={'New Form'} onClick={e => history.push('/newForm')}>
          <ListItemText primary={'Create from eyes (manualy) -opt'} />
        </ListItem>


        {/* <ListItem button key={'Conduct Test'} onClick={e => setOpenH2H(!openH2H)}>
          <ListItemText primary={'Conduct Test'} />
          {openH2H ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}

        {/* <Collapse in={openH2H} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[{ text: 'Predictions', link:'/h2h'}, { text: 'Last Games', link:'/h2h-stats'} ].map((navItem) => (
              <ListItem button key={navItem.text} onClick={e => history.push(navItem.link)} className={classes.nested}>
                <ListItemText primary={navItem.text} />
              </ListItem>
            ))}
          </List>
        </Collapse> */}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopNav isExperimentMode/>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route path="/experiments/new">
              <NewExperiment/>
            </Route>
        </Switch>  
      </main>
    </div>
  );
}

export default MainExperiments;

