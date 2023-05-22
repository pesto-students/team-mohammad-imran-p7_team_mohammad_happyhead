import React from 'react';
import { Grid, CardContent } from '@mui/material';
import CardStyle from '../../styles/CardStyles';
import MuiLink from '../../MuiLink';

const ToolCard = ({ tool, handleCardClick, isLoggedIn }) => {
  const muiLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardStyle onClick={() => handleCardClick(tool)}>
        <CardContent>
          <MuiLink
            href={isLoggedIn ? tool.path : '/loginUser'}
            underline="none"
            color="inherit"
            variant="h5"
            component="h2"
            gutterBottom
            sx={muiLinkStyles}
          >
            {tool.name}
          </MuiLink>
          <MuiLink
            href={isLoggedIn ? tool.path : '/loginUser'}
            underline="none"
            color="inherit"
            variant="body1"
            component="p"
            sx={muiLinkStyles}
          >
            {tool.subtext}
          </MuiLink>
        </CardContent>
      </CardStyle>
    </Grid>
  );
};

export default ToolCard;
