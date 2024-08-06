import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack } from '@mui/material'
import { ChevronDownIcon as ExpandIcon } from '../../../icons'
import { Link } from '../../../link'
import { StudyCollectionButton, VariableCollectionButton } from '../../collection'
import { Paragraph } from '../../../typography';
import { snipText } from '../../../../utils'



const VAR_DESCRIPTION_LENGTH = 300

const Variable = ({ variable }) => {
  const { description, e_link, id, name } = variable

  const snippet = React.useMemo(() => {
    if (description.length > VAR_DESCRIPTION_LENGTH) {
      return snipText(description, VAR_DESCRIPTION_LENGTH)
    }
    return description
  }, [description,])

  return (
    <Box sx={{
      borderLeft: '3px solid #dde',
      px: 2, my: 1,
      '.var-description': { m: 0 },
    }}>
      <div>
        { name } :: <Link to={ e_link }>{ id }</Link>
        &nbsp;&nbsp;
        <VariableCollectionButton variable={ variable } tooltipPlacement="top" size="small" />
      </div>
      <div className="var-description">{ snippet }</div>
    </Box>
  )
}

export const StudiesTab = ({ studies }) => {
  return (
    <Box sx={{
      '.accordion-summary': {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        zIndex: 1,
        top: 0,
        backgroundColor: '#ece9f3',
        '.flex': {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2,
        },
      },
      '.accordion-details': {
        backgroundColor: '#fcf9f3',
        px: 2,
      },
    }}>
      { 
        studies.length ? studies.map((study, i) => (
          <Accordion
            key={ `${ i }-${ study.id }` }
            defaultExpanded={ i === 0 }
            elevation={ 0 }
            disableGutters
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              aria-controls={ `${ study.c_id }-content` }
              id={ `${ study.c_id }-heading` }
              expandIcon={ <ExpandIcon size={ 16 } fill="var(--color-blueberry)" /> }
              className="accordion-summary"
            >
              <Box className="flex">
                <span>
                  { study.c_name }
                  {' :: '}
                  <Link
                    to={ study.c_link }
                    onClick={ event => event.stopPropagation() /* prevent accordion expand/collapse on link click */ }
                  >{ study.c_id }</Link>
                  &nbsp;&nbsp;
                  <StudyCollectionButton study={ study } tooltipPlacement="top" size="small" />
                </span>
                <span>{ study.elements.length } variable{ study.elements.length === 1 ? '' : 's' }</span>
              </Box>
            </AccordionSummary>
            <AccordionDetails className="accordion-details">
              {
                study.elements
                  .sort((e, f) => {
                    if (e.name.toLowerCase() < f.name.toLowerCase()) { return -1 }
                    if (e.name.toLowerCase() > f.name.toLowerCase()) { return 1 }
                    return e.id < f.id ? -1 : 1
                  })
                  .map(el => <Variable key={ `${ study.id }_${ el.id }` } variable={ el } />)
              }
            </AccordionDetails>
          </Accordion>
        )) : (
          <Stack justifyContent="center" alignItems="center">
            <Paragraph>No associated studies were found!</Paragraph>
          </Stack>
        )
      }
    </Box>
  )
}