import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog, 
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Tab,
  Tabs,
} from '@mui/material'
import { useSearch } from '../context'
import { DebugTab, ExplanationTab, StudiesTab } from './tabs'
import { LoadingDots } from '../../loading'
import { ConceptCollectionButton } from '../collection'
import { Paragraph, Subheading, Subsubheading } from '../../typography'

//

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={ value !== index }
      id={ `tabpanel-${index}` }
      aria-labelledby={ `tab-${index}` }
      className="tab-panel"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        overflowY: 'scroll',
        maxHeight: '100%',
        maxWidth: '1000px',
        width: '100%',
        p: 4,
      }}
      { ...other }
    >
      { value === index && children }
    </Box>
  )
}

const StudiesLoadingIndicator = () => (
  <Stack justifyContent="center" alignItems="center">
    <LoadingDots textPlacement="top" text="Locating studies..." />
  </Stack>
)

export const ResultDialog = () => {
  const { fetchStudies, query, selectedResult, setSelectedResult } = useSearch()
  const [open, setOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [studies, setStudies] = useState([])
  const [loadingStudies, setLoadingStudies] = useState(false)
  
  const handleClose = useCallback(() => {
    setOpen(false)
    // we'll want the closing animation to finish before deselecting the result,
    // otherwise the dialog will immediately unmount. not so nice.
    const deselectTimeout = setTimeout(() => {
      setSelectedResult(null)
      setStudies([])
      setTabIndex(0)
    }, 150)
    // and cleanup.
    return () => clearTimeout(deselectTimeout)
  }, [setSelectedResult])

  const handleClickTab = (event, value) => {
    setTabIndex(value)
  }

  //

  useEffect(() => {
    // we're in here if selectedResult has changed.
    // if there is no selected result, then the dialog should not be open.
    if (!selectedResult) {
      handleClose()
      return
    }
    // then we must have a result to look at,
    // so open the dialog...
    setOpen(true)
  }, [handleClose, open, selectedResult])

  useEffect(() => {
    // we're in here if selectedResult has changed.
    // if there is no selected result, then we bail out now.
    if (!selectedResult) {
      return
    }
    // then we must have a result to look at,
    // so we fire off requests for the additional data related to our result:
    // - studies
    // 
    // todo: improve this logic, error-handling
    setLoadingStudies(true)
    const loadStudies = async () => {
      const data = await fetchStudies(selectedResult.id, query)
      if (!data) {
        return
      }
      setStudies(data)
      setLoadingStudies(false)
    }
    loadStudies()
    // - etc
  }, [fetchStudies, handleClose, query, selectedResult])

  //

  // bail out early if the dialog isn't open.
  if (!selectedResult) {
    return <span id="result-dialog-placeholder" />
  }

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      aria-labelledby="title-bar"
      aria-describedby="dialog-content"
      sx={{
        '.MuiDialog-paper': {
          minHeight: '50vh',
          maxHeight: '75vh',
          width: '100%',
          maxWidth: '1200px',
        },
        '.MuiStack-root': { height: '50vh' },
        '#title-bar': {
          p: 0,
          pl: 2,
          display: 'flex',
          alignItems: 'center',
        },
        '#title-bar .concept-name': {
          p: 0,
          flex: 1,
        },
        '#dialog-content': {
          p: 0,
        },
        '.dialog-description': {
          flex: `0 1 400px`,
          p: 4,
          overflow: 'scroll',
        },
        '.dialog-description h4': {
          p: 0,
        },
        '.tab-panel': {
          flex: 3,
        },
      }}
    >
      <Box id="title-bar">
        <Subheading noMargin className="concept-name">
          { selectedResult.name }&nbsp;&nbsp;
          <ConceptCollectionButton concept={ selectedResult } tooltipPlacement="right" />
        </Subheading>
        <Tabs value={ tabIndex } onChange={ handleClickTab } className="tabs">
          <Tab
            label={ `Studies (${ loadingStudies ? '...' : studies.length })`}
            disabled={ studies.length === 0 }
          />
          <Tab label="Explanation" />
          { process.env.NODE_ENV === 'development' && <Tab label="Debug" /> }
        </Tabs>
      </Box>

      <DialogContent id="dialog-content" dividers>
        <Stack direction="row">

          <Box className="dialog-description">
            <Subsubheading>Description</Subsubheading>
            <Paragraph>{ selectedResult.description }</Paragraph>

            <br />

            <Divider />

            <br />

            {
              !loadingStudies && (
                <ul>
                  <li>studies: { studies.length }</li>
                  <li>variables: { studies.reduce((sum, study) => sum + study.elements.length, 0) }</li>
                </ul>
              )
            }
          </Box>

          <Divider orientation="vertical" flexItem />
          
          <TabPanel value={ tabIndex } index={ 0 } sx={{ p: 0 }}>
            {
              loadingStudies
                ? <StudiesLoadingIndicator />
                : <StudiesTab studies={ studies } />
            }
          </TabPanel>

          <TabPanel value={ tabIndex } index={ 1 }>
            <ExplanationTab />
          </TabPanel>

          {/* this debug tab can stay. its tab is only rendered in development mode */}
          <TabPanel value={ tabIndex } index={ 2 } sx={{ p: 0 }}>
            <DebugTab>{ JSON.stringify({ concept: selectedResult, studies }, null, 2) }</DebugTab>
          </TabPanel>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={ handleClose }>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
