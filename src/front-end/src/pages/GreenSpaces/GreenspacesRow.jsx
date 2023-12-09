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
   
  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router';
  import { setMapCenter } from 'redux/setMapCenterSlice';
  import { setMapZoomLevel } from 'redux/mapZoomLevelSlice';
  import { setIsLoading } from 'redux/loader/slice';
  import { useState } from 'react';
  import { changePublicAreaGroup } from 'services/areasOfPublicUse';
  import { setNotification } from 'redux/notification/slice';
  
  const AreasOfPublicUseTableRow = ({ record, groups, getNewRecords }) => {
    const [currentGroup, setCurrentGroup] = useState(record.group || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // const onZoneIconClick = async () => {
    //   dispatch(setLoader(true));
  
    //   if (record.zone) {
    //     const center = {
    //       lat: record.zone.points[0].lat,
    //       lng: record.zone.points[0].lng,
    //     };
  
    //     const zonePointsBody = record.zone.points.map((point) => ({
    //       Lat: point.lat,
    //       Lng: point.lng,
    //     }));
  
    //     try {
    //       const response = await fetch(
    //         `https://europe-west1-bins-to-owners-332bc.cloudfunctions.net/getZoneCenter`,
    //         {
    //           method: 'POST',
    //           body: JSON.stringify({
    //             ZonePoints: zonePointsBody,
    //           }),
    //         }
    //       );
  
    //       const resultCenter = await response.json();
  
    //       if (resultCenter) {
    //         center.lat = resultCenter.Lat;
    //         center.lng = resultCenter.Lng;
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     } finally {
    //       dispatch(setLoader(false));
    //     }
  
    //     dispatch(setCenter(center));
    //     dispatch(setZoom(20));
    //   }
  
    //   dispatch(setGreenspaces([record]));
    //   navigate('/');
    // };
  
    
  
    return (
      <TableRow
        sx={{
          '&:hover': {
            backgroundColor: '#e6faf2',
          },
        }}
      >
        <TableCell>{record.name}</TableCell>
        
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
  