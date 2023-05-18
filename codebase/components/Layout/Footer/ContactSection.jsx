import React from 'react';
import { Box, Typography } from '@mui/material';
import { NextLinkComposed } from '../../MuiLink';
import theme from '../../styles/theme';

const ContactSection = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" gutterBottom align="center">
          Contact
        </Typography>
        <NextLinkComposed
          to="/contact-us"
          color="textPrimary"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Contact us
          </Typography>
        </NextLinkComposed>
        <NextLinkComposed
          to="/mental-health-resources"
          color="textPrimary"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Mental health resources
          </Typography>
        </NextLinkComposed>
        <NextLinkComposed
          to="/accessibility-statement"
          color="textPrimary"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Accessibility Statement
          </Typography>
        </NextLinkComposed>
      </Box>
    );
  };
  

export default ContactSection;
