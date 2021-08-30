import React from 'react'
import {
    Typography,
    LinearProgress,
    Link,
    useTheme,
    Box
} from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';

export default function Linear({ link, value, classes }) {
    return (

        <Box mt={1}>
            <Typography variant="h4">
            {Intl.NumberFormat().format(value)}</Typography>
            <LinearProgress
                style={{ height:'10px'}}
                classes={classes}
                value={value}
                variant="determinate"
            />
            <Typography variant="body1">
                <Link
                    component={RouterLink}
                    target="_blank"
                    to="/deliveries"
                    variant="h6"
                >
                    {link}
                </Link>
            </Typography>
        </Box>
    )
}
