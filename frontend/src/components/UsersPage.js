import React, { Component } from 'react';
import { Paper, withStyles, CssBaseline, Grid, Badge, Typography, Button, Divider, Table, TableRow, TableCell, TableHead } from '@material-ui/core';
import Drawer from './Drawer';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: '100%'
    },
    badge: {
        margin: '25px'
    },
    paperHeading: {
        margin: '25px',
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    usersHeading: {
        margin: '0'
    },
    createNewButton: {
        margin: '0 40px 0 0',
        right: '40px'
    },
    table: {
        padding: '30px'
    },
});

class UsersPage extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Paper>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Badge badgeContent={0} color='primary' className={classes.badge}>
                                    <Typography variant='h4' gutterBottom className={`${classes.paperHeading} ${classes.usersHeading}`}>Users</Typography>
                                </Badge>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    className={classes.createNewButton}
                                    onClick={this.handleOpen}>Add New</Button>
                            </Grid>
                        </Grid>
                        <Divider variant='middle' />
                        <div className={classes.table}>
                            <Table padding='dense'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Return Date</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </div>

                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(UsersPage);