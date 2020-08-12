import React, { Component } from 'react';
import { Paper, withStyles, CssBaseline, Grid, Badge, Typography, Button, Divider, Table, TableRow, TableCell, TableHead, CircularProgress, TableBody } from '@material-ui/core';
import Drawer from './Drawer';
import { Query } from 'react-apollo';
import { GET_USERS_QUERY } from '../queries/Queries';
import moment from 'moment';
import UsersTableRow from './UsersTableRow';


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
                                    onClick={this.handleOpen}>Add New Users</Button>
                            </Grid>
                        </Grid>
                        <Divider variant='middle' />
                        <div className={classes.table}>
                            <Query query={GET_USERS_QUERY}>
                                {({loading, error, data}) => {
                                    if (loading) return <CircularProgress />
                                    if (error) return <Typography>{error.message}</Typography>
                                    return (
                                        <Table padding='dense'>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Role</TableCell>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.users.map(row => (
                                                    <UsersTableRow
                                                        key={row._id}
                                                        id={row._id}
                                                        name={row.name}
                                                        role={row.role}
                                                        username={row.username}
                                                        returnDate={
                                                            moment(row.returnDate, "YYYY-MM-DD").format("Do MMMM, YYYY")
                                                        }
                                                        handleEdit={this.handleEdit} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )
                                }}
                            </Query>
                        </div>

                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(UsersPage);