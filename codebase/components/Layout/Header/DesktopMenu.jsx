import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiLink from '../../MuiLink'

const DesktopMenu = ({ pages, handleCloseNavMenu, theme }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <MuiLink key={page.name} href={page.path} color="inherit" underline="none">
          <Button
            component="div"
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: theme.palette.text.primary, display: 'block' }}
          >
            {page.name}
          </Button>
        </MuiLink>
      ))}
    </Box>
  )
}

export default DesktopMenu
