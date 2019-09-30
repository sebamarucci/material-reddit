import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import EntryList from "./list/list";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import EntryListLoading from "./list/list-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import {matchPath} from "react-router";
import get from "lodash/get";
import Pagination from "material-ui-flat-pagination";

const drawerWidth = 350;

const LIST_PAGE_SIZE = 15;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
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
    overflow: 'auto'
  },
  footerButton: {
    textAlign: 'center',
    borderRadius: 0,
    minHeight: '56px',
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: '48px'
    },
    '@media (min-width:600px)': {
      minHeight: '64px'
    }
  },
  container: {
    overflow: 'hidden',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
}));

function RedditDrawer(props) {

  const [redditEntries, setRedditEntries] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const { container, entries, updateEntry, history, loadingStatus } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const match = matchPath(props.history.location.pathname, {
    path: '/detail/:entryId',
    exact: true,
    strict: false
  });
  const selectedEntryId = get(match, "params.entryId");


  useEffect(() =>{
    setRedditEntries(props.entries);
  },[entries]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function viewDetails (entry){
    updateEntry({...entry, visited: true});
    history.push("/detail/"+entry.id);
  }

  function dismissAll(){
    setRedditEntries([]);
    history.push("/");
  }

  function dismiss(entryId) {
    setRedditEntries(redditEntries.filter(e => e.id !== entryId));
  }

  function handlePagination(event, offset, pageNumber){
    setPageOffset(offset );
  }

  const drawer = (
    <div className={classes.container}>
      <div className={classes.toolbar}/>
      <Divider />
      <div className={classes.content}>
        <EntryList entries={redditEntries.slice(pageOffset, pageOffset + LIST_PAGE_SIZE)} handleDismiss={dismiss} handleViewDetails={viewDetails} selectedEntryId={selectedEntryId}/>
      </div>
      <div>
        <Pagination
          limit={LIST_PAGE_SIZE}
          offset={pageOffset}
          total={redditEntries.length}
          onClick={handlePagination}
        />
      </div>
      <Button className={classes.footerButton} disabled={redditEntries.length === 0} onClick={dismissAll}>Dismiss All</Button>
    </div>
  );

  const drawerLoading = (
    <div className={classes.container}>
      <div className={classes.toolbar}/>
      <Divider />
      <div className={classes.content}>
        <EntryListLoading/>
      </div>
      <Skeleton height={30} width={30}/>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Reddit Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <nav  className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {loadingStatus === "LOADING" ? drawerLoading : drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {loadingStatus === "LOADING" ? drawerLoading : drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

RedditDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default withRouter(RedditDrawer);