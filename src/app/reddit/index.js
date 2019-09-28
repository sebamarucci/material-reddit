import React, {useEffect} from 'react'
import {HashRouter} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import RedditDrawer from "./drawer";
import {Route} from "react-router";
import {makeStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import {getTop50Entries} from "./selector";
import {loadTopEntries, updateEntry} from "./action";
import EntryDetailPage from "../reddit/EntryDetail"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}));

function Reddit(props) {
  const classes = useStyles();


  return (
    <HashRouter>
      <div className={classes.root}>
        <CssBaseline/>
        <RedditDrawer {...props}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/" render={(props) => <div>Nothing yet</div>}/>
          <Route exact path="/detail/:entryId" component={EntryDetailPage}/>
        </main>
      </div>
    </HashRouter>
  );
}


function RedditContainer(props){

  useEffect(()=>{
    props.loadTopEntries(0,0,50);
  },[]);

  return(<Reddit {...props}/>)
}


const mapStateToProps = (state, props) => {
  return {
    entries: getTop50Entries(state)
  };

};

export default connect(mapStateToProps, {
  loadTopEntries,
  updateEntry
})(RedditContainer);