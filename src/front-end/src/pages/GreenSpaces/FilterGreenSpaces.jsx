import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
  } from '@mui/material';
  import { useState } from 'react';
  import { useDispatch } from 'react-redux';
  //import { setLoader } from 'redux/loader/slice';
  //import { setNotification } from 'redux/notification/slice';
  
  //import { cleaningRows } from 'utils/pages/cleaning/cleaningRows';
  
  const FilterGreenspaces = ({ getNewRecords }) => {
    const [name, setName] = useState('');
    const [area, setArea] = useState(1);
    const [category, setCategory] = useState('');
  
    const [nameError, setNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const dispatch = useDispatch();
  
    const handleNameChange = (e) => {
      setName(e.target.value);
      if (e.target.value) {
        setNameError('');
      }
    };
  
    const handleAreaChange = async (e) => {
      setArea(Math.max(1, e.target.value));
    };
  
    const handleRowChange = (e) => {
      setCategory(e.target.value);
      if (e.target.value) {
        setCategoryError('');
      }
    };
  
    const checkInputs = () => {
      let isValid = true;
  
      if (!name) {
        setNameError('Името е задължително.');
        isValid = false;
      } else {
        setNameError('');
      }
  
      if (!category) {
        setCategoryError('Категорията е задължителна.');
        isValid = false;
      } else {
        setCategoryError('');
      }
  
      return isValid;
    };
  
    const handleSubmit = async () => {
      const isValid = checkInputs();
      if (!isValid) {
        return;
      }
  
      dispatch(setLoader(true));
  
      try {
        await addAreaOfPublicUse({ name, area, category });
        await getNewRecords();
  
        resetStates();
        dispatch(
          setNotification({
            open: true,
            message: 'Успешно добавяне!',
            severity: 'success',
            vertical: 'top',
            horizontal: 'center',
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoader(false));
      }
    };
  
    const resetStates = () => {
      setName('');
      setArea(1);
      setCategory('');
      setNameError('');
      setCategoryError('');
    };
  
    return (
      <Box
        sx={{
          m: '0 auto',
          width: '70%',
          maxWidth: '600px',
        }}
      >
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            border: '1px solid #e0e0e0',
            padding: '1rem',
            borderRadius: '0.5rem 0.5rem 0 0',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Име"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
            sx={{
              width: '25%',
            }}
          />
  
          <TextField
            label="Площ кв. м."
            variant="outlined"
            value={area}
            onChange={handleAreaChange}
            type="number"
            sx={{
              width: '25%',
            }}
          />
  
          <FormControl
            variant="outlined"
            sx={{ flex: 1 }}
            error={!!categoryError}
          >
            <InputLabel id="category-label">Категория</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              onChange={handleRowChange}
              label="Категория"
            >
              {cleaningRows.map((row, index) => (
                <MenuItem key={index} value={row}>
                  {row}
                </MenuItem>
              ))}
            </Select>
            {!!categoryError && (
              <FormHelperText>{categoryError}</FormHelperText>
            )}
          </FormControl>
        </Stack>
  
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            width: '100%',
            marginTop: 0,
            backgroundColor: '#10b981',
            borderRadius: '0 0 0.5rem 0.5rem',
            '&:hover': {
              backgroundColor: '#048f73',
            },
          }}
        >
          Добави
        </Button>
      </Box>
    );
  };
  
  export default FilterGreenspaces;
  