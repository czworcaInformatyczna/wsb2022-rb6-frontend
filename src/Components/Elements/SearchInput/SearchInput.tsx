import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/Elements/SearchInput';

export const SearchInput = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{
          'aria-label': 'search',
        }}
        placeholder="Search…"
      />
    </Search>
  );
};
