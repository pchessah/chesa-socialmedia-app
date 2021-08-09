import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(5),
        },
    }
}));

function Loading() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    return (
        <>
            <Backdrop className={classes.backdrop} open={open}>
                <div className={classes.root}>
                    <LinearProgress />
                </div>

            </Backdrop>
        </>

    )
}

export default Loading
