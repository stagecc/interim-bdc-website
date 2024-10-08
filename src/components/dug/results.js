import React, { Fragment, useCallback, useMemo } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { LoadingSpinner } from '../loading'
import { Link } from '../link'
import { useSearch } from './context'
import { ResultCard } from './result-card'
import { ResultDialog } from './result-dialog'
import { ControlledFetcher } from './controlled-fetcher'
import { ErrorCard } from '../card'

//

const LoadingIndicator = () => (
  <LoadingSpinner height="400px" />
)

//

const Suggestions = ({ concepts = [] }) => {
  if (concepts.length === 0) {
    return <span />
  }

  return (
    <Box sx={{ '& li': { my: 1 } }}>
      Continue your search with one of these related concepts:
      <br />
      <ul>
        {
          concepts.map(concept => (
            <li key={ `related_${ concept }` }>
              <Link to={ `/use-bdc/explore-data/dug/?q=${ concept }` }>{ concept }</Link>
            </li>
          ))
        }
      </ul>
    </Box>
  )
}

//

export const Results = () => {
  const {
    currentPage, error, fetchConcepts, filteredResults, isLoading,
    pageCount, query, relatedConcepts,
  } = useSearch()

  // boolean, whether more results exist beyond our current list
  // (util for controlled fetcher)
  const canLoadMore = useMemo(() => currentPage < pageCount, [currentPage, pageCount])

  // function to handle fetching new results to list
  // (util for controlled fetcher)
  const loadMore = useCallback(() => fetchConcepts(query, currentPage + 1), [fetchConcepts, query, currentPage])

  // this gets rendered when the bottom of our list,
  // when more data are available to fetch.
  // (util for controlled fetcher)
  const MoreMessage = () => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '300px', mt: 8 }}
        gap={ 3 }
      >
        <Button
          variant="outlined"
          size="large"
          onClick={ loadMore }
          aria-label="Load more results"
        >Load More Results</Button>
      </Stack>
    )
  }

  // this gets rendered when the bottom of
  // the infinite scroll container is reached.
  // (util for controlled fetcher)
  const NoMoreMessage = () => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '300px', mt: 8 }}
        gap={ 3 }
      >
        {
          filteredResults.length ? (
            <Fragment>
              <Box>It looks like we're at the end of this road.</Box>
              <Suggestions concepts={ relatedConcepts } />
            </Fragment>
          ) : <Box>No results!</Box>
        }
      </Stack>
    )
  }

  // no searching has taken place yet.
  if (query === '') {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ height: '300px' }}
      >
        Search concepts, studies, and variables
        in the BioData Catalyst ecosystem!
      </Stack>
    )
  }

  if (error) {
    return (
      <ErrorCard>
        <Typography align="center">
          It appears we are currently experiencing technical difficulties
          with our semantic search service, Dug. As a result, semantic
          search functionality is temporarily unavailable. Our team is
          actively working to resolve the issue, and we will communicate
          updates on appropriate channels as soon as the service is restored.
          <br /><br />
          We apologize for any inconvenience and appreciate your patience.
        </Typography>
      </ErrorCard>
    )
  }

  return (
    <Fragment>
      <ControlledFetcher
        dataLength={ filteredResults.length }
        hasMore={ canLoadMore }
        fetchMore={ loadMore }
        loading={ isLoading }
        moreMessage={ <MoreMessage /> }
        loadingMessage={ <LoadingIndicator /> }
        noMoreMessage={ <NoMoreMessage /> }
      >
        <Grid container spacing={ 4 }>
          {
            filteredResults.map((result, i) => (
              <Grid item
                key={ `${i}_${result.id}` }
                xs={ 12 } lg={ 6 }
              >
                <ResultCard result={ result } index={ i } />
              </Grid>
            ))
          }
        </Grid>
      </ControlledFetcher>

      <ResultDialog />
    </Fragment>
  )
}
