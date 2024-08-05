import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import {
  BookmarkBorder as CollectionIcon,
  Bookmark as CollectionIconActive,
} from '@mui/icons-material'
import { Subsubheading } from '../../typography'

export const CollectionAccordion = ({ title, children, open }) => {
  return (
    <Accordion
      elevation={ 0 }
      expanded={ open }
      sx={{
        '*': { cursor: 'default !important', }, // i couldn't seem to make this work on single classes
        '.MuiAccordionSummary-root': {
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: -1,
          filter: open ? 'opacity(1) saturate(1)' : 'opacity(0.5) saturate(0.5)',
          transition: 'filter 250ms 100ms',          
        },
        '.MuiAccordionSummary-expandIconWrapper': { transform: 'rotate(0deg)', ml: 1 },
        '.MuiAccordionSummary-content': { cursor: 'default !important', ml: 1, },
        '.MuiAccordionDetails-root': {
          p: 0,
          pl: 3,
          '& *': { py: 0 },
          '.MuiListItem-root': { py: 0 },
          '.MuiListItemText': { m: 0 },
          '.MuiListItemText-root': { pl: 2 },
        },
      }}
    >
      <AccordionSummary
        expandIcon={ open
          ? <CollectionIconActive color="secondary" />
          : <CollectionIcon color="secondary" />
        }
        aria-controls={ `${ title }-content-section` }
        id={ `${ title }-header` }
        sx={{
        }}
      >
        <Subsubheading noMargin>{ title }</Subsubheading>
      </AccordionSummary>
      <AccordionDetails className="details">
        {
          React.Children.count(children) > 0 ? children : (
            <Typography
              paragraph
              className="details none"
              sx={{ pl: 4, fontStyle: 'italic', color: 'var(--color-lightgrey)' }}
            >None selected.</Typography>
          )
        }
      </AccordionDetails>
    </Accordion>
  )
}
