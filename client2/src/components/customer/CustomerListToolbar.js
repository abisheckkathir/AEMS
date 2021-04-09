import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';



const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        variant="contained"
        color="primary"
        style={{marginRight: 10}}
        // onClick={handleClickOpen}
        startIcon={<AddCircleRoundedIcon />}
      >
        Add Course
      </Button>
      <Button
        variant="contained"
        color="secondary"
        // onClick={deleteCourse}
        startIcon={<DeleteIcon />}
      >
        Delete Course
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search course"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
