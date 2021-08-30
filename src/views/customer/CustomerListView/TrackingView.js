import React, { useState, useEffect } from 'react';
import {
    Typography, IconButton, SvgIcon, Button, Paper,
    CircularProgress, Box, Card, CardContent, CardHeader,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle


} from '@material-ui/core';
import { useSelector, useDispatch } from 'src/store';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { viewTracking, dashboardSelector } from 'src/slices/dashboard';
import {
    Eye as EyeIcon,
    Disc as DiscIcon,
} from 'react-feather';

import { MoreHoriz } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {

            backgroundColor: theme.palette.background.paper,
            width: '60%',
            // border: '2px solid #000',
            // boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        parent: {
            display: 'flex',
            margin:theme.spacing(2),
            alignItems: 'center',
            borderTop: '1px solid #e7e7e7',
            borderBottom: '1px solid #e7e7e7',
            backgroundColor: '#f8f8f8'
        },
        info: {
            padding: '15px',
            borderLeft: '1px solid #e7e7e7',
            flexGrow: 1,
            height: 'auto'
        },
    }),
);
const TrackingDetail = ({ model, showModal, data }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    console.log('data=>', data);
    console.log('model=', model);
    const classes = useStyles();
    const [open, setOpen] = React.useState(model);
    const [detail, setDetail] = React.useState({});
    const dispatch = useDispatch();
    const {trackingLoading,trackingData,trackingError}=useSelector(dashboardSelector);

    // useEffect(() => {
    //     console.log(trackingData.message);
    //     if (trackingData != ''){
    //         // dispatch(viewTracking(data));
    //         setDetail(trackingData);

    //     }
    // },[trackingLoading]);

    if (trackingData != '') {
        var tracking = trackingData.detail.map((tracks, index) => {
            return (
                <div className={classes.parent}>
                    <div className={classes.info}>
                        <Typography variant="h6" gutterBottom>
                            STATUS
      </Typography>
                        {tracks.status}
                    </div>
                    <div className={classes.info}>
                        <Typography variant="h6" gutterBottom>
                            CN#
      </Typography>
                        {tracks.cnno}
                    </div>

                    <div className={classes.info}>
                        <Typography variant="h6" gutterBottom>
                            DATE
      </Typography>
                        {tracks.cndate}
                    </div>

                    <div className={classes.info}>
                        <Typography variant="h6" gutterBottom>
                            CUSTOMER
      </Typography>
                        {tracks.con_name}
                    </div>

                    <div className={classes.info}>
                        <Typography variant="h6" gutterBottom>
                            PRICE
      </Typography>
                        {tracks.codamount}
                    </div>
                    <div className={classes.info}>
                        <Typography variant="h6" gutterBottom>
                            FROMTO
      </Typography>
                        {`${tracks.origin} -->${tracks.destination}`}
                    </div>
                </div>
            )
        });

        var cnno;
        
        var trackingDetail = trackingData.detail.map((tracks, index) => {
            cnno = tracks.cnno;
            return (
                tracks.trackingdetail.map((track, i) =>
                    (

                        <Box display="flex" mt={2}>
                            <Typography variant="body2" >
                                {track.statusdate}
                            </Typography>
                            <Typography variant="body2">
                                {track.statustime}
                            </Typography>

                            <Typography variant="body2">
                                {track.statusmsg}
                            </Typography>
                        </Box>
                    )
                )
            )
        })
    }


    const handleOpen = () => {
        setOpen(true);
      
    };


    useEffect(()=>{
        dispatch(viewTracking(data));
    },[model])

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
           
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,

                }}
            >
                <Fade in={open}>
                    {trackingLoading == true ?
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minWidth={'100%'}
                            minHeight={'100%'}
                        >
                            <CircularProgress />
                        </Box> :
                        <Card className={classes.paper}>
                            <CardHeader
                            title={`TRACKING DETAIL - ${cnno}`}
                            />

                            <CardContent>
                                {tracking}
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    color="textSecondary"
                                    component="p">
                                    {`BLUEEX SHIPPING LABEL: : ${cnno}`}
                                </Typography>
                                {trackingDetail}
                            </CardContent>
                        </Card>
                    }
                </Fade>
            </Modal>
        </>
    )
}

export default TrackingDetail;