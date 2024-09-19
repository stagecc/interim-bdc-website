import React from 'react'
import {
  Stack, Typography,
} from '@mui/material'
import { ButtonLink } from '../../buttons';
import {
  ArrowForward as NextIcon,
} from '@mui/icons-material'
import { useSearch } from '../context'

const DugButtonLink = ({to, children, items, ...props}) => {
  function filterFields(obj) {
    return {
      concepts: obj.concepts.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type
      })),
      studies: obj.studies.map(item => ({
        id: item.id,
        name: item.name,
        source: item.source
      })),
      variables: obj.variables.map(item => ({
        id: item.id,
        name: item.name,
      }))
    };
  }
  
  const collectionItems = filterFields(items);
  
  const handleClick = (e) => {
    // Push the selected items to the GTM data layer
    dataLayer.push({
      event: 'dug-checkout-collection',
      concepts: collectionItems.concepts,
      studies: collectionItems.studies,
      variables: collectionItems.variables  
    });
  
  };
  return (
    <ButtonLink to={to} onClick={handleClick} {...props}>{children}</ButtonLink>
  )
}

export const CheckoutCta = () => {
  const { collection } = useSearch()

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
      <DugButtonLink
        to={ '/use-bdc/explore-data/dug/next-steps' }
        className="next-button GTM-button"
        id="dug-next"
        items={collection.contents}
      >
        Next&nbsp;&nbsp;&nbsp;<NextIcon />
      </DugButtonLink>
    </Stack>
  )
}

