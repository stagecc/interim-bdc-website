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
      conceptIds: obj.concepts.map(item => item.id),
      conceptNames: obj.concepts.map(item => item.name),
      studyIds: obj.studies.map(item => item.id),
      studyNames: obj.studies.map(item => item.name),
      variableIds: obj.variables.map(item => item.id),
      variableNames: obj.variables.map(item => item.name)
    };
  }
  
  const collectionItems = filterFields(items);
  
  const handleClick = (e) => {
    // Push the selected items to the GTM data layer
    window.dataLayer.push({
      event: 'dug-checkout-collection',
      dugCheckoutConceptIds: collectionItems.conceptIds,
      dugCheckoutConceptNames: collectionItems.conceptNames,
      dugCheckoutStudyIds: collectionItems.studyIds,
      dugCheckoutStudyNames: collectionItems.studyNames,
      dugCheckoutVariableIds: collectionItems.variableIds,
      dugCheckoutVariableNames: collectionItems.variableNames  
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

