import React from 'react'
import {
  Stack, Typography,
} from '@mui/material'
import { ButtonLink } from '../../buttons';
import {
  ArrowForward as NextIcon,
} from '@mui/icons-material'

export const CheckoutCta = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        '.next-button': {
          borderRadius: '31px',
          width: '75%'
        },
      }}
    >
      <Typography paragraph align="center" color="secondary" sx={{ fontStyle: 'italic' }}>
        <strong>Finished Selecting Items?</strong><br />
      </Typography>
      <ButtonLink
        to={ '/use-bdc/explore-data/dug/next-steps' }
        className="next-button"
      >
        Next&nbsp;&nbsp;&nbsp;<NextIcon />
      </ButtonLink>
    </Stack>
  )
}

