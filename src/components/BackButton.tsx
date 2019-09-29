import { withRouter } from "react-router";
import React from 'react';
import { IconButton } from "@material-ui/core";
import BackIcon from '@material-ui/icons/ArrowBack';
import { RouteComponentPropsWithRouteConfig } from "../routes";


const BackButtonWithoutRouter: React.FC<RouteComponentPropsWithRouteConfig> = (props) => {
    const { route, history } = props;

    if (!route.main) {
      return null;
    }

    let parent = route.parent;
    while (parent && !parent.main) {
      parent = parent.parent;
    }

    const disabled = parent ? false : true;

    return (
      <IconButton disabled={disabled} onClick={() => parent && history.push(parent.path)}>
        <BackIcon />
      </IconButton>
    );
  }

  export default withRouter(BackButtonWithoutRouter);