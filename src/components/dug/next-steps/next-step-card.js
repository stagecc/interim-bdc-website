import React from 'react'
import {
  Card, CardActionArea, CardContent, CardHeader, Collapse,
} from '@mui/material'
import { ExpandMore as ExpandIcon } from '@mui/icons-material'
import { DataDisplay } from './data-display';
import Markdown from 'react-markdown';
import { Heading } from '../../typography'

export const NextStepCard = ({
  clickHandler,
  color = '#eee',
  data,
  details,
  expanded,
  title,
  url,
}) => {
  
  return ( 
    <Card
      className="next-step-card"
      sx={{
        height: '100%',
        backgroundColor: color,
        '.MuiCardHeader-root': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.MuiCardHeader-title': { },
        '.MuiCardHeader-action': {
          alignSelf: 'center',
          mr: 2,
        },
        '.MuiCardContent-root': {
          p: 4,
          backgroundColor: '#fff6',
          lineHeight: 1.5,
        },
        '.MuiCardActionArea-root': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
      }}
    >
      <CardActionArea onClick={ clickHandler } disabled={ expanded }>
        <CardHeader
          disableTypography
          title={ <Heading noMargin>{ title }</Heading> }
          action={ <ExpandIcon color={ expanded ? 'disabled' : 'secondary' } /> }
        />
      </CardActionArea>
      <Collapse in={ expanded }>
        <CardContent>
          <Markdown>{ details }</Markdown>
        </CardContent>
        <CardContent sx={{ flex: 1 }}>
          <DataDisplay data={ data } />
        </CardContent>
      </Collapse>
    </Card>
  )
}
