import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TableCell,
    TableRow,
  } from '@mui/material';
  import { Box } from '@mui/system';
  import { FormatShapes, ModeEdit } from '@mui/icons-material';
  import { setPublicAreas } from 'redux/publicAreas/slice';
  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router';
  import { setCenter } from 'redux/center/slice';
  import { setZoom } from 'redux/zoom/slice';
  import { setLoader } from 'redux/loader/slice';
  import { useState } from 'react';
  import { changePublicAreaGroup } from 'services/areasOfPublicUse';
  import { setNotification } from 'redux/notification/slice';
  
  const AreasOfPublicUseTableRow = ({ record, groups, getNewRecords }) => {
    const [currentGroup, setCurrentGroup] = useState(record.group || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const onZoneIconClick = async () => {
      dispatch(setLoader(true));
  
      if (record.zone) {
        const center = {
          lat: record.zone.points[0].lat,
          lng: record.zone.points[0].lng,
        };
  
        const zonePointsBody = record.zone.points.map((point) => ({
          Lat: point.lat,
          Lng: point.lng,
        }));
  
        try {
          const response = await fetch(
            `https://europe-west1-bins-to-owners-332bc.cloudfunctions.net/getZoneCenter`,
            {
              method: 'POST',
              body: JSON.stringify({
                ZonePoints: zonePointsBody,
              }),
            }
          );
  
          const resultCenter = await response.json();
  
          if (resultCenter) {
            center.lat = resultCenter.Lat;
            center.lng = resultCenter.Lng;
          }
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setLoader(false));
        }
  
        dispatch(setCenter(center));
        dispatch(setZoom(20));
      }
  
      dispatch(setPublicAreas([record]));
      navigate('/');
    };
  
    const onChangeGroup = async (e) => {
      dispatch(setLoader(true));
  
      try {
        await changePublicAreaGroup(record.id, { group: e.target.value });
        await getNewRecords();
        setCurrentGroup(e.target.value);
  
        dispatch(
          setNotification({
            open: true,
            message: 'Успешно сменихте групата!',
            severity: 'success',
            vertical: 'bottom',
            horizontal: 'center',
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoader(false));
      }
    };
  
    return (
      <TableRow
        sx={{
          '&:hover': {
            backgroundColor: '#e6faf2',
          },
        }}
      >
        <TableCell>{record.name}</TableCell>
        <TableCell>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Група</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentGroup}
                label="Група"
                onChange={onChangeGroup}
              >
                {groups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </TableCell>
        <TableCell>{record.area}</TableCell>
        <TableCell>{record?.zone?.area?.toFixed(3) || '-'}</TableCell>
        <TableCell>{record.category}</TableCell>
        <TableCell align="center">
          <IconButton onClick={onZoneIconClick}>
            {record.zone ? (
              <FormatShapes sx={{ color: '#10b981' }} />
            ) : (
              <ModeEdit sx={{ color: '#FD904D' }} />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };
  
  export default AreasOfPublicUseTableRow;
  