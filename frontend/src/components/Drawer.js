import { AppBar, CssBaseline, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Toolbar, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { AddShoppingCart, People, Dashboard, Description, ExitToApp, LibraryAdd, Search, Store } from '@material-ui/icons';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { LOG_OUT_MUTATION } from '../queries/Queries';
import CreateStockModal from './CreateStockModal';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40vw',
            '&:focus': {
                width: '60vw',
            },
        }
    },
    grow: {
        flexGrow: 1
    },
    activeNav: {
        // backgroundColor: 'blue'
    },
    stockButton: {
        color: "#fff"
    }
})

class SideDrawer extends Component {
    state = {
        modalOpen: false
    }

    // Deprecated
    navChangeHandler = e => {
        const location = e.target.innerText.toLowerCase().trim()
        this.props.history.push(`/${location}`)
    }

    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    render() {
        const { classes } = this.props;
        const pathname = this.props.history.location.pathname.toLowerCase();
        const icons = [
            <Dashboard />,
            <AddShoppingCart />,
            <Store />,
            <Description />,
            <People />,
        ]

        return (
            <div>
                <CssBaseline />
                {this.state.modalOpen && <CreateStockModal
                    onAccept={this.handleStockAdd}
                    onClose={this.handleClose}
                    history={this.props.history} />}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <Search />
                            </div>
                            <InputBase
                                placeholder="Search for anything..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <Tooltip title="Add new stock">
                            <IconButton variant='outlined' color='secondary' onClick={this.handleOpen} className={classes.stockButton}>
                                <LibraryAdd />
                            </IconButton>
                        </Tooltip>
                        <Mutation
                            ignoreResults
                            mutation={LOG_OUT_MUTATION}>
                            {(logout, { client }) =>
                                <Tooltip title="Log Out">
                                    <IconButton variant='outlined' onClick={() => logout().then(client.resetStore())} className={classes.stockButton}>
                                        <ExitToApp />
                                    </IconButton>
                                </Tooltip>
                            }
                        </Mutation>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        {['Dashboard', 'Requisitions', 'Stock', 'Tasks', 'Users'].map((text, index) => (
                            <ListItem button component={Link} to={text} key={text}>
                                <ListItemIcon>{React.cloneElement(icons[index], pathname.endsWith(text.toLowerCase()) ? { color: 'primary' } : {})}</ListItemIcon>
                                <ListItemText primary={text} primaryTypographyProps={pathname.endsWith(text.toLowerCase()) ? { color: 'primary' } : {}} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }
}
export default withStyles(styles)(SideDrawer);