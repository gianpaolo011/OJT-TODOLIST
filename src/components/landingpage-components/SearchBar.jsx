import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search' 
import debounce from 'lodash.debounce'
import { IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'

function SearchBar({ result, setFilteredTasks, textColor, searchbarColor }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase()
    
    if (trimmedQuery === '') {
      setFilteredTasks(result?.result || [])
    } else {
      const filtered = result?.result?.filter((item) =>
        item.text.toLowerCase().includes(trimmedQuery),
      )
      setFilteredTasks(filtered)
    }
  }

  const debouncedSearch = debounce(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase()
    if (trimmedQuery === '') {
      setFilteredTasks(result?.result || [])
    } else {
      const filtered = result?.result?.filter((item) =>
        item.text.toLowerCase().includes(trimmedQuery),
      )
      setFilteredTasks(filtered)
    }
  }, 100)

  useEffect(() => {
    debouncedSearch()
  }, [searchQuery])

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
    // if (e.target.value.trim() === '') {
    //   window.location.reload()
    // }
  }
  return (
    <Box className="landingpage__searchbar">
      <TextField
      sx={{color: textColor, backgroundColor: searchbarColor}}
        label="Search Tasks"
        onChange={handleSearchInputChange}
        variant="standard"
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  )
}

export default SearchBar
