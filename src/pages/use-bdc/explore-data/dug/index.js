import React, { useMemo, useState } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import { PageContent } from '../../../../components/layout'
import { Title } from '../../../../components/typography'
import {
  CheckoutCta, CollectionPreview, DugForm, FiltersTray,
  Results, Sidebar, ToTopButton
} from '../../../../components/dug'

const DugSearchPage = () => {
  const [sidebarVisibility, ] = useState(true)

  const mainContentSizes = useMemo(() => {
    if (sidebarVisibility) {
      return { xs: 12, md: 8, lg: 9 }
    }
    return { xs: 12, md: 12, lg: 12 }
  }, [sidebarVisibility])

  const sidebarSizes = useMemo(() => {
    if (sidebarVisibility) {
      return { xs: 12, md: 4, lg: 3 }
    }
    return { xs: 0, md: 0, lg: 0 }
  }, [sidebarVisibility])

  return (
    <PageContent hideTitle title="Disease, Phenotype, Biological Process, or Anatomical Entity Search">
      <Box sx={{ position: 'relative' }}>
        <Title>Disease, Phenotype, Biological Process, or Anatomical Entity Search</Title>
      </Box>

      <Grid container spacing={ 4 }>
        <Grid item { ...mainContentSizes }>
          <Stack>
            <DugForm focusOnMount slashFocus />
            <FiltersTray />
            <Results />
            <ToTopButton />
          </Stack>
        </Grid>

        {
          sidebarVisibility && <Grid item
            { ...sidebarSizes }
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Sidebar>
              <CollectionPreview />
              <CheckoutCta />
            </Sidebar>
          </Grid>
        }
      </Grid>

    </PageContent>
  );
}

export default DugSearchPage;

