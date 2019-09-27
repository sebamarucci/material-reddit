import React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Image from 'material-ui-image'
import Divider from "@material-ui/core/Divider";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";

import './list.css';
import fromNow from "../../common/fromNow";

export default function EntryList(props) {

  const {entries = [], handleDismiss, handleViewDetails} = props;

  function dismiss(event, entryId){
    event.stopPropagation();
    handleDismiss(entryId);
  }

  return (
    <List>
      <TransitionGroup>
        {entries.map(entry =>
          <CSSTransition
            key={entry.id}
            timeout={500}
            classNames="item"
          >
            <div>
              <ListItem button onClick={() => handleViewDetails(entry)}>
                <Grid container direction="row" spacing={1}>
                  <Grid container direction="row" item>
                    <Grid container alignItems="center" justify="center" item xs={1}>
                      {!entry.visited && <span className="dot"></span>}
                    </Grid>
                    <Grid item>
                      <Typography><strong>{entry.author}</strong> {fromNow(entry.created_utc)}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container wrap="nowrap" direction="row" item spacing={1}>
                    <Grid item xs={3}>
                      <Image src={entry.thumbnail}/>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{entry.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item>
                    <Grid item xs={4}>
                      <Button onClick={(event) => dismiss(event, entry.id)}>Dismiss</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider/>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </List>
  )
}

EntryList.propTypes = {
  entries: PropTypes.array.isRequired,
  handleDismiss: PropTypes.func.isRequired,
  handleViewDetails: PropTypes.func.isRequired
};
