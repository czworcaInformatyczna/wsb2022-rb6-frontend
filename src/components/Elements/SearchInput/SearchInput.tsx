import SearchIcon from '@mui/icons-material/Search';
import { Box, Popper } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from 'components/Elements/SearchInput';
import { useRef, useState } from 'react';
import ResultList from './ResultList';
import { useGetSearch } from './searchapi';

export const SearchInput = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const divRef = useRef<any>();
  const [search, setSearch] = useState<string>('');
  const { data: results } = useGetSearch<any[]>(
    { searched: search },
    search.length === 0 ? false : true,
  );

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <Box>
      <div ref={divRef}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputProps={{
              'aria-label': 'search',
            }}
            placeholder="Search…"
            onChange={(e) => {
              setAnchorEl(divRef.current);
              setSearch(e.target.value);
            }}
            value={search}
          />
        </Search>
      </div>
      <Popper open={results !== undefined} placement="bottom" disablePortal anchorEl={anchorEl}>
        <ResultList results={results ? results : []} clear={clearSearch} />
      </Popper>
    </Box>
  );
};
