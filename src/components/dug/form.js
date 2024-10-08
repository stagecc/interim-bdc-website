import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSearch } from './context'

import {
  Fade,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Tooltip,
} from '@mui/material'
import {
  Search as SearchIcon,
  Backspace as ClearQueryIcon,
} from '@mui/icons-material'

//

export const DugForm = ({ focusOnMount = false, slashFocus = false }) => {
  const { doSearch, query } = useSearch()
  const [formQuery, setFormQuery] = useState(query)
  const inputRef = useRef()
  
  const handleChangeFormQuery = event => {
    setFormQuery(event.target.value)
  }

  const handleClickClearQuery = event => {
    setFormQuery('')
    if (!inputRef.current) {
      return
    }
    inputRef.current.focus()
  }

  const handleClickSubmit = event => {
    event.preventDefault()

    // determine the search location based on the current URL
    let searchLocation;

    if (window.location.pathname === '/') {
      searchLocation = 'BDC Home';
    } else if (window.location.pathname.includes('/use-bdc/explore-data/dug')) {
      searchLocation = 'Dug Search Page';
    } else {
      searchLocation = window.location.pathname
    }

    // this pushes the search term and location to Google Analytics
    window.dataLayer.push({
      event: 'dug-search-items',
      dugSearchTerm: formQuery,
      dugSearchLocation: searchLocation
    });
    doSearch(formQuery)
  }

  useEffect(() => {
    if (!focusOnMount || !inputRef.current) {
      return;
    }
    const focusTimer = setTimeout(() => inputRef.current.focus(), 250);
    return () => clearTimeout(focusTimer);
  }, [focusOnMount, inputRef])

  // this catches in-app user-conducted query changes,
  // like clicking a related concept,
  // and aligns the form's query value with state.
  useEffect(() => {
    setFormQuery(query)
  }, [query])

  useEffect(() => {
    if (!slashFocus) {
      return
    }
    // this lets the user jump focus to the search box
    // with the forward slash "/" key
    const handleKeyPress = event => {
      if (inputRef.current) {
        const inputFocus = inputRef.current.input === document.activeElement
        if (!inputFocus) {
          if (event.key === '/') {
            event.preventDefault()
            inputRef.current.focus()
            inputRef.current.select()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [slashFocus])

  return (
    <Paper
      component="form"
      onSubmit={ handleClickSubmit }
      sx={{
        p: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        border: '2px solid transparent',
        backgroundColor: '#eceef3',
        transition: 'background-color 250ms, border-color 250ms',
        '&:focus-within': {
          backgroundColor: '#eef3f9',
          border: '2px solid var(--color-blueberry)',
        },
        borderRadius: '8px',
        '.MuiIconButton-root': { p: 1 },
        '& .clear-button': {
          transition: 'filter 250ms',
          filter: 'opacity(0.25) saturate(0.0)',
        },
        '&:hover .clear-button': { filter: 'opacity(0.5) saturate(0.25)' },
        '&:hover .clear-button:hover': { filter: 'opacity(1.0) saturate(1.0)' },
        '.slash-key': {
          position: 'relative',
          backgroundColor: '#ddd9',
          borderTop: '4px solid #ddd6',
          borderRight: '4px solid #ccc9',
          borderBottom: '4px solid #ccc9',
          borderLeft: '4px solid #ddd6',
          borderRadius: '2px',
          width: '24px', height: '24px',
          ml: 1,
          pointerEvents: 'none',
          '&::after': {
            position: 'absolute',
            left: 0, right: 0,
            top: 0, bottom: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            content: '"/"',
            fontWeight: 'bold',
            color: '#6666',
            fontSize: '85%',
          },
        },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: 1 }}
        placeholder="Search data in BDC"
        inputProps={{ 'aria-label': 'Search BDC Data' }}
        value={ formQuery }
        onChange={ handleChangeFormQuery }
        inputRef={ inputRef }
        endAdornment={
          <Fragment>
            <Fade in={ !!formQuery }>
              <InputAdornment position="end">
                <Tooltip title="Clear query" placement="left">
                  <IconButton
                    aria-label="clear query"
                    color="primary"
                    size="small"
                    className="clear-button"
                    onClick={ handleClickClearQuery }
                  >
                    <ClearQueryIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            </Fade>
            { slashFocus && <span className="slash-key" /> }
          </Fragment>
        }
      />

      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
