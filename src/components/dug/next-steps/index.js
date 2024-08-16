import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { navigate } from 'gatsby';

import {
  Button, Card, CardContent, Divider,
  List, ListItem, ListItemText, Stack,
} from '@mui/material';
import {
  Download as DownloadIcon,
  ArrowBack as ReturnIcon,
} from '@mui/icons-material';
import { useSearch } from '../context';
import { downloadFile } from '../../../utils';
import { NextStepCard } from './next-step-card';
import { CollectionAccordion } from './collection-accordion';

//

export const NextSteps = ({ steps }) => {
  const { collection } = useSearch()

  const nextSteps = steps
    .map(step => ({
      ...step,
      data: step.relevantCollectionTypes.reduce((acc, t) => {
        acc.push(...collection.contents[t].map(x => x.id))
        return acc;
      }, [])
    }))

  const { concepts, studies, variables } = collection.contents
  const [activeIndex, setActiveIndex] = useState(-1)

  const visibleContentSections = useMemo(() => {
    return activeIndex in nextSteps
      ? nextSteps[activeIndex].relevantCollectionTypes
      : []
  }, [activeIndex, nextSteps])

  useEffect(() => {
    const defaultIndexTimer = setTimeout(() => setActiveIndex(0), 1000)
    return () => clearTimeout(defaultIndexTimer)
  }, [])

  const handleClickStep = newIndex => () => {
    setActiveIndex(newIndex)
  }

  const handleClickDownloadAsJson = event => {
    event.preventDefault()
    event.target = event.currentTarget;

    const timestamp = new Date().toISOString()
    downloadFile({
      data: JSON.stringify(collection.contents, null, 2),
      fileName: `BDC-Collection_${ timestamp }.json`,
      filetype: 'text/json',
    })
  }

  const handleClickReturnToSearch = () => {
    navigate(-1)
  }

  return (
    <Fragment>
      <Card elevation={ 2 }>
        <Stack direction="row" sx={{
          '.MuiList-root': { p: 0 },
          '.MuiListItem-root.MuiListItem-dense': { py: 0 },
        }}>
          <CardContent sx={{ p: 0, flex: 1 }} component={ Stack }>
            <CollectionAccordion
              title={ `Concepts (${ concepts.length })` }
              open={ visibleContentSections.includes('concepts') }
            >
              { concepts.length > 0 ? (
                <List dense>
                  {
                    concepts.map(({ id, name, type, description }) => (
                      <ListItem key={ `contents-concepts-${ id }` }>
                        <ListItemText primary={ name } secondary={ id } />
                      </ListItem>
                    ))
                  }
                </List>
              ) : null }
            </CollectionAccordion>
            
            <Divider />

            <CollectionAccordion
              title={ `Studies (${ studies.length })` }
              open={ visibleContentSections.includes('studies') }
            >
              { studies.length > 0 ? (
                <List dense>
                  {
                    studies.map(({ id, name, url, source }) => (
                      <ListItem key={ `contents-studies-${ id }` }>
                        <ListItemText primary={ name } secondary={ id } />
                      </ListItem>
                    ))
                  }
                </List>
              ) : null }
            </CollectionAccordion>
            
            <Divider />

            <CollectionAccordion
              title={ `Variables (${ variables.length })` }
              open={ visibleContentSections.includes('variables') }
            >
              { variables.length > 0 ? (
                <List dense>
                  {
                    variables.map(({ id, name, description, url }) => (
                      <ListItem key={ `contents-variables-${ id }` }>
                        <ListItemText primary={ name } secondary={ id } />
                      </ListItem>
                    ))
                  }
                </List>
              ) : null }
            </CollectionAccordion>

            <Divider />

            <Stack
              justifyContent="flex-end"
              alignItems="center"
              sx={{ flex: 1, py: 4 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={ handleClickDownloadAsJson }
                sx={{ gap: 2, maxWidth: '100%', '.button-text': { display: 'inline-block' } }}
                className="GTM-download-click"
                id="dug-download"
              >
                <DownloadIcon size="large" />
                <span className="button-text">Download List</span>
              </Button>
            </Stack>

          </CardContent>

          <Divider flexItem orientation="vertical" />

          <CardContent sx={{ flex: 2 }}>
            <Stack gap={ 2 }>
              {
                nextSteps.map(({ ...step }, i) => (
                  <NextStepCard
                    key={ `option-${ step.title }` }
                    expanded={ i === activeIndex }
                    clickHandler={ handleClickStep(i) }
                    { ...step }
                  />
                ))
              }
            </Stack>
          </CardContent>
        </Stack>

      </Card>

      <br />

      <Button
        variant="outlined"
        startIcon={ <ReturnIcon /> }
        onClick={ handleClickReturnToSearch }
      >Return to Search</Button>

    </Fragment>
  );
}
