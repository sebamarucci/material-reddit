import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function EntryListLoading(props) {

  return (
    <List>
      {[1,2,3,4,5,6,7,8].map(i =>
        <div key={i}>
          <ListItem button onClick={() => handleViewDetails(entry)}>
            <Grid container direction="row" spacing={1}>
              <Grid container direction="row" item>
                <Grid container alignItems="center" justify="center" item xs={1}>
                  <Skeleton circle={true} height={".75em"} width={".75em"}/>
                </Grid>
                <Grid xs={4} item>
                  <Skeleton height={20}/>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" direction="row" item spacing={1}>
                <Grid item xs={3}>
                  <Skeleton height={60} width={60}/>
                </Grid>
                <Grid item xs={9}>
                  <Skeleton height={20}/>
                  <Skeleton height={20}/>
                  <Skeleton height={20}/>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={4}>
                  <Skeleton height={20}/>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider/>
        </div>
      )}
    </List>
  )
}