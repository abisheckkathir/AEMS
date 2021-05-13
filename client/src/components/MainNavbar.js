import { AppBar, Toolbar } from '@material-ui/core';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
