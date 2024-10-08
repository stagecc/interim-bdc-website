import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  Box, Button, Card, CardContent, CardHeader, Collapse, Divider,
  IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Tooltip,
} from '@mui/material'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple'
import {
  BookmarkBorder as CollectionIcon,
  Delete as ClearCollectionIcon,
  ExpandLess as CollapseIcon,
  ExpandMore as ExpandIcon,
  Delete as DeleteIcon,
  Remove as HandleIcon,
  MoreVert as MenuIcon,
} from '@mui/icons-material'
import { useSearch } from '../context'

//

const textOverflowStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

/*
 * Invokes the MUI ripple effect on `element`.
 * 
 * @param {element} DOM element to receive the ripple effect.
 * @param {ripple} The DOM element that is the ripple itself.
 */
const triggerRipple = (element, ripple) => {
  const rect = element.getBoundingClientRect();

  ripple.start(
    {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    },
    { center: false }, // when center is true, the ripple doesn't travel to the border of the container
  )

  setTimeout(() => ripple.stop({ }), 500)
};

const CollectionActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { collection } = useSearch()

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Fragment>
      <IconButton
        id="collection-actions-button"
        aria-controls={ open ? 'collection-actions-menu' : undefined }
        aria-haspopup="true"
        aria-expanded={ open ? 'true' : undefined }
        onClick={ handleClick }
        sx={{ filter: 'opacity(0.5)', transition: 'filter 250ms', '&:hover': { filter: 'opacity(1.0)' } }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="collection-actions-menu"
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        onClick={ handleClose }
        MenuListProps={{ 'aria-labelledby': 'collection-actions-button' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={ () => collection.clear() } disabled={ collection.count === 0 }>
          <ListItemIcon><ClearCollectionIcon /></ListItemIcon>
          <ListItemText>Empty Contents</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export const CollectionPreview = () => {
  const { collection } = useSearch()
  const [expanded, setExpanded] = useState(false)
  const buttonRef = useRef(null)
  const rippleRef = useRef(null)

  const clickToggleExpand = () => {
    setExpanded(!expanded)
  }

  const handleClickRemoveFromCollection = (type, id) => () => {
    collection.remove(type, id)
  }

  // this effect will be responsible for orchestrating a signal
  // to the user that the contents of their collection have updated.
  // es-
  useEffect(() => {
    // we can bail out early if the collection is empty.
    if (collection.count === 0) {
      setExpanded(false)
      return
    }

    // if the collection is already expanded, there's no opening to do...
    if (expanded) {
      // ...but we can (todo) ripple the just-added collection item.
      return
    }

    // we'll want to ensure the references are in place before proceeding to invoke the aimation.
    if (!rippleRef.current || !buttonRef.current) {
      return
    }
    
    // let's draw attention to the expand/collapse button
    // and open the collection fully.
    triggerRipple(buttonRef.current, rippleRef.current)
    // actually open the thing.
    setExpanded(true)
    // (todo) do ripple effect on the just-added collection item.
    //
    // note the loop caused by adding `expanded` to the dependency array,
    // so perhaps there is a better solution.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.count])

  return (
    <Card sx={{
      '.MuiCardContent-root': { p: 0 },
      '.contents .MuiCollapse-root': { backgroundColor: '#f6f6f9' },
      '.MuiCardActions-root': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2, py: 3,
      },
      '.list-item': {
        py: 0,
        '.MuiListItemText-root': {
          my: '2px',
        },
      },
      '.list-item .remove-button': {
        transition: 'filter 150ms',
        filter: 'opacity(0.1) saturate(0.0)',
      },
      '.list-item:hover .remove-button': { 
        filter: 'opacity(0.75) saturate(0.1)',
      },
      '.list-item .remove-button:hover': {
        filter: 'opacity(1.0) saturate(1.0)',
      },
    }}>
      <CardHeader
        title="Collection"
        subheader={ `${ collection.count } item${ collection.count === 1 ? '' : 's' }` }
        titleTypographyProps={{ color: 'secondary' }}
        avatar={ <CollectionIcon size="large" color="secondary" /> }
        action={ <CollectionActionsMenu /> }
      />

      <Divider />
      
      <CardContent>
        <List dense className="contents">
          {
            Object.keys(collection.contents).map(key => (
              <Fragment key={ `collection-${ key }` }>
                <ListSubheader color="default">
                  { key[0].toUpperCase() + key.slice(1) } ({ collection.contents[key].length })
                </ListSubheader>
                <Collapse in={ expanded } timeout="auto" unmountOnExit>
                  {
                    collection.contents[key].map(item => (
                      <ListItem
                        key={ `collection-${ key }-${ item.id }` }
                        className="list-item"
                        secondaryAction={
                          <Tooltip title="Remove from Collection" placement="top">
                            <IconButton
                              className="remove-button"
                              aria-label="Remove from Collection"
                              onClick={ handleClickRemoveFromCollection(key, item.id) }
                              color="warning" size="small"
                            ><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        }
                      ><ListItemText
                        primary={ ` • ${ item.name }` }
                        secondary={ item.id }
                        primaryTypographyProps={{ sx: { fontWeight: '500', ...textOverflowStyle } }}
                        secondaryTypographyProps={{ sx: { pl: 1 } }}
                      /></ListItem>
                    ))
                  }
                </Collapse>
              </Fragment>
            ))
          }
        </List>
      </CardContent>

      <Divider />

      {
        collection.count === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HandleIcon sx={{ margin: 'auto', filter: 'opacity(0.25)' }} /> 
          </Box>
        ) : (
          <Tooltip title={ `${ expanded ? 'Hide' : 'Show' } Collection Details` } placement="bottom">
              <Button
                fullWidth
                onClick={ clickToggleExpand }
                color="secondary"
                ref={ buttonRef }
              >
                { expanded ? <CollapseIcon  /> : <ExpandIcon  /> }
                <TouchRipple ref={ rippleRef } center />
              </Button>
          </Tooltip>
        )
      }
    </Card>
  )
}