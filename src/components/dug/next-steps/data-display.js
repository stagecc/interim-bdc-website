import React, { Fragment, useEffect, useState } from 'react'
import {
  Box, IconButton, Stack, Typography,
} from '@mui/material'
import { CopyAll as CopyIcon } from '@mui/icons-material'

export const DataDisplay = ({ data = [] }) => {
  const [copied, setCopied] = useState(false)


  useEffect(() => {
    const alertTimeout = setTimeout(() => setCopied(false), 3000)
    return () => clearTimeout(alertTimeout)
  }, [copied])

  const handleClickCopy = () => {
    navigator.clipboard.writeText(data.join(', '))
    setCopied(true)
  }

  if (data.length === 0) { return <div /> }

  return (
    <Box
      className={ copied ? 'data copied' : 'data'}
      sx={{
        backgroundColor: '#fff6',
        borderRadius: 1,
        border: '1px solid',
        borderColor: '#fff9',
        transition: 'border-color 250ms',
        p: 2,
        fontFamily: 'monospace',
        minHeight: '64px',
        '.datum': {
          position: 'relative',
          pl: 2,
          lineHeight: 1,
          '&::before': {
            content: '"- "',
            fontFamily: 'monospace',
            lineHeight: 1,
            position: 'absolute',
            left: 0,
            top: 0,
          },
        },
        position: 'relative',
        '.copy-container': {
          position: 'absolute',
          top: '8px',
          right: '8px',
          '.MuiTypography-root': {
            transition: 'filter 250ms',
            filter: 'opacity(1.0) saturate(0.0)',
          },
        },
        '&:hover .copy-container .MuiTypography-root': {
          filter: 'opacity(1.0) saturate(0.0)',
        },
        '&.copied': {
          borderColor: 'var(--color-sea)',
          '.copy-container': {
            '.MuiTypography-root': {
              filter: 'opacity(1.0) saturate(1.0)',
            },
          },
        },
      }}
    >
      {
        data.map(d => (
          <Fragment key={ d }>
            <span className="datum">{ d }</span><br />
          </Fragment>
        ))
      }
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={ 1 }
        className="copy-container"
      >
        <Typography
          variant="caption"
          sx={{ color: 'var(--color-sea)' }}
        >{ copied ? 'Copied!' : 'Copy to clipboard' }</Typography>
        <IconButton
          disabled={ !data.length || copied }
          onClick={ handleClickCopy }
          size="small"
        >
          <CopyIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  )
}
