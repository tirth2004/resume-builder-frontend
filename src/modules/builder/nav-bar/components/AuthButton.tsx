import { useEffect, useState } from 'react';
import { StyledButton } from '../atoms';
import { Menu, MenuItem } from '@mui/material';

export const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsLoggedIn(!!storedToken);
    setToken(storedToken || '');
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      // Login logic will be implemented later
      console.log('Login clicked');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken('');
    handleClose();
  };

  return (
    <>
      <StyledButton variant="text" onClick={handleClick}>
        {isLoggedIn ? token : 'Login'}
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
