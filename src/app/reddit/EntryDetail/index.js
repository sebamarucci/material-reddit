import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image/lib/components/Image/Image";
import {getRedditEntry} from "../selector";
import {connect} from "react-redux";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles(theme => ({
  imageContainer:{
    width: "auto",
    height: "auto",
    minHeight: "100px",
    minWidth: "100px"
  }
}));

function EntryDetail(props){

  const {entry = {}} = props;
  const classes = useStyles();

  return(
    <Grid container direction="row" spacing={8} padding={8}>
      <Grid item>
        <Typography variant={"h6"}>{entry.author}</Typography>
      </Grid>
      <Grid container alignItems="center" justify="center" item>
        <div  >
          <Image src={entry.thumbnail} style={{padding: "0"}}
                 imageStyle={{position: "relative"}}
          />
        </div>
      </Grid>
      <Grid item>
        <Typography>{entry.title}</Typography>
      </Grid>
    </Grid>
  )
}


function EntryDetailLoading(props){

  return (<Grid container direction="row" spacing={8} padding={8}>
    <Grid item xs={3}>
      <Skeleton height={20}/>
    </Grid>
    <Grid container alignItems="center" justify="center" item>
      <div  >
        <Skeleton height={80} width={80}/>
      </div>
    </Grid>
    <Grid xs={5} item>
      <Skeleton height={20}/>
    </Grid>
  </Grid>)
}

function EntryDetailContainer(props){
  const {entry} = props;
  return(
    !entry ? <EntryDetailLoading/>
      : <EntryDetail {...props}/>
  )
}


const mapStateToProps = (state, props) => {
  const entryId = props.match.params.entryId;
  return {
    entry: getRedditEntry(state,entryId)
  };

};

export default connect(mapStateToProps)(EntryDetailContainer);