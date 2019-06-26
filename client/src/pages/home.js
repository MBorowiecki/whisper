//Libraries imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { 
    Dialog, 
    DialogActions, 
    Button, 
    ListSubheader, 
    ListItemText,
    List,
    ListItem,
    ListItemAvatar,
    Collapse,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import axios from 'axios'
import { 
    LogoutDialogContent, 
    LogoutIcon, 
    MessagesContainer, 
    OptionsButton, 
    OptionsContainer, 
    AddContactIcon, 
    SettingsIcon, 
    ContactsContainer, 
    ContactsItem, 
    ContactsList, 
    AvatarContainer, 
    MainContainer, 
    UserName, 
    AvatarImage, 
    SideBarContainer,
    AddContactDialogTitle,
    AddContactDialogSearchBar,
    AddContactDialogContent,
    AddContactDialogSearchBarContainer,
    AddContactDialogSearchIcon,
    AddContactDialogList,
    AddContactNameText
} from './styledComponents/homeComponents';

//Config imports
import adresses from '../config/adresses';

export default class Home extends React.Component{
    constructor(){
        super();

        this.state = {
            logged: true,
            sideBarFlex: 2,
            logoutDialog: false,
            userFavourites: [],
            userFriends: [],
            addContactDialog: false,
            contactToAddCredentials: '',
            contactToAddId: 0,
            allUsers: [],
        }
    }

    componentDidMount(){
        this.getUserFriends()
        this.checkToken()
        this.updateWindowSize()
        window.addEventListener('resize', this.updateWindowSize.bind(this))

        axios.get(adresses.serverAdress + '/users')
        .then((res) => {
            if(res.status === 200)
                this.setState({allUsers: res.data})
        })
        .catch((err) => {
            if(err)
                console.log(err)
        })
    }

    updateWindowSize(){
        if(window.innerWidth < 700){
            this.setState({
                sideBarFlex: 0
            })
        }else if(window.innerWidth >= 700 && window.innerWidth < 900){
            this.setState({
                sideBarFlex: 4
            })
        }else if(window.innerWidth >= 900 && window.innerWidth < 1200){
            this.setState({
                sideBarFlex: 3
            })
        }else if(window.innerWidth >= 1200){
            this.setState({
                sideBarFlex: 2
            })
        }
    }

    checkToken(){
        if(window.sessionStorage.getItem('jwt')){
            let decodedToken = jwt.decode(window.sessionStorage.getItem('jwt'), {complete: true});
            let dateNow = new Date();
            if(decodedToken.payload.exp < dateNow.getTime() / 1000){
                this.setState({
                    logged: false
                })
            }else{
                this.setState({
                    logged: true
                })
            }
        }else if(window.sessionStorage.getItem('jwt') === undefined){
            this.setState({
                logged: false
            })
        }
    }

    getUserFriends(){
        if(window.sessionStorage.getItem('jwt') && window.sessionStorage.getItem('_id')){
            axios.get(adresses.serverAdress + '/users/' + window.sessionStorage.getItem('_id'))
            .then((res) => {
                if(res.status === 200){
                    console.log(res.data)
                    if(res.data[0].favourites.length > 0){
                        res.data[0].favourites.map((favouriteId) => {
                            axios.get(adresses.serverAdress + '/users/' + favouriteId._id)
                            .then((res) => {
                                if(res.status === 200){
                                    let favourites = this.state.userFavourites;
    
                                    favourites.push(res.data);
                                    this.setState({
                                        userFavourites: favourites
                                    })
                                }
                            })
                            .catch((err) => {
                                if(err){
                                    console.log(err)
                                }
                            })
                        })
                    }

                    if(res.data[0].friends.length > 0){
                        res.data[0].friends.map((friendId) => {
                            axios.get(adresses.serverAdress + '/users/' + friendId._id)
                            .then((res) => {
                                if(res.status === 200){
                                    let friends = this.state.userFriends;
    
                                    friends.push(res.data[0]);
                                    this.setState({
                                        userFriends: friends
                                    })
                                }
                            })
                            .catch((err) => {
                                if(err){
                                    console.log(err)
                                }
                            })
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    logout(){
        window.sessionStorage.clear();
        this.setState({
            logged: false
        })
    }

    handleChange(state){
        //reverse passed state
        this.setState({
        [state]: !this.state[state]
        })
    }

    render(){
        if(!this.state.logged){
            window.sessionStorage.clear();
            return(
                <Redirect to='/' />
            )
        }

        return(
            <MainContainer>
                <SideBarContainer flex={this.state.sideBarFlex}>
                    <AvatarContainer>
                        <AvatarImage 
                            src={window.sessionStorage.getItem('avatar_name') ? adresses.serverAdress + '/avatar/' + window.sessionStorage.getItem('avatar_name') : adresses.serverAdress + '/avatar/x.png'} 
                        />
                        <UserName>
                            {window.sessionStorage.getItem('first_name')} {window.sessionStorage.getItem('last_name')}
                        </UserName>
                    </AvatarContainer>
                    <ContactsContainer>
                        <ContactsList>
                            <ListSubheader>Favourites</ListSubheader>
                            {this.state.userFavourites.length > 0 && this.state.userFavourites.map((favourite, index) => {
                                return(
                                    <ContactsItem key={index}>
                                        <ListItemText>{favourite.first_name} {favourite.last_name}</ListItemText>
                                    </ContactsItem>
                                )
                            })}
                            <ListSubheader>Friends</ListSubheader>
                            {this.state.userFriends.length > 0 && this.state.userFriends.map((friend, index) => {
                                return(
                                    <ContactsItem key={index}>
                                        <ListItemText>{friend.first_name} {friend.last_name}</ListItemText>
                                    </ContactsItem>
                                )
                            })}
                            <ListSubheader>Others</ListSubheader>
                        </ContactsList>
                    </ContactsContainer>
                    <OptionsContainer>
                        <OptionsButton onClick={() => this.handleChange('addContactDialog')}>
                            <AddContactIcon />
                        </OptionsButton>
                        <OptionsButton>
                            <SettingsIcon />
                        </OptionsButton>
                        <OptionsButton onClick={() => this.handleChange('logoutDialog')}>
                            <LogoutIcon />
                        </OptionsButton>
                    </OptionsContainer>
                </SideBarContainer>
                <MessagesContainer>

                </MessagesContainer>

                {/*Logout dialog*/}
                <Dialog
                    open={this.state.logoutDialog}
                    onClose={() => this.handleChange('logoutDialog')}
                    PaperProps={{
                        style:{
                            backgroundColor: '#000000',
                            paddingTop: 10
                        }
                    }}
                >
                    <LogoutDialogContent>
                        Do you really want to logout?
                    </LogoutDialogContent>
                    <DialogActions>
                        <Button style={{color: '#ffffffdd', fontFamily: 'Montserrat', fontSize: 13}} onClick={() => this.handleChange('logoutDialog')}>No</Button>
                        <Button style={{backgroundColor: '#ff0000dd', color: '#ffffffcc', fontFamily: 'Montserrat', fontSize: 15}} variant='contained' onClick={() => this.logout()}>Yes!</Button>
                    </DialogActions>
                </Dialog>

                {/*Add contact dialog*/}
                <Dialog
                    open={this.state.addContactDialog}
                    onClose={() => this.handleChange('addContactDialog')}
                    PaperProps={{
                        style:{
                            backgroundColor: '#000000',
                        }
                    }}
                    maxWidth='md'
                    fullWidth
                    >
                    <AddContactDialogTitle>
                        Search for new contacts
                    </AddContactDialogTitle>
                    <AddContactDialogContent>
                        <AddContactDialogSearchBarContainer>
                            <AddContactDialogSearchIcon />
                            <AddContactDialogSearchBar 
                                type='text'
                                placeholder='Search'
                                onChange={(e) => {this.setState({contactToAddCredentials: e.target.value})}}
                            />
                        </AddContactDialogSearchBarContainer>
                        <Collapse
                            in={this.state.contactToAddCredentials.length > 0}
                        >
                            <AddContactDialogList>
                                {this.state.allUsers.sort((a, b) => {return a.last_name - b.last_name}).filter((a) => {
                                    let fullName = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();

                                    return fullName.includes(this.state.contactToAddCredentials.toLowerCase());
                                }).map((user) => {
                                    let friendsCounter = 0;
                                    this.state.userFavourites.map((contact) => {
                                        if(contact._id === user._id){
                                            friendsCounter++;
                                        }
                                    })

                                    this.state.userFriends.map((contact) => {
                                        if(contact._id === user._id){
                                            friendsCounter++;
                                        }
                                    })

                                    if(friendsCounter === 0){
                                        return(
                                            <ListItem style={{borderBottom: '1px solid #ffffff11'}} button>
                                                {user.avatar_name ? <ListItemAvatar><img src={adresses.serverAdress + '/avatar/' + user.avatar_name}  style={{width: 50, height: 50}} /></ListItemAvatar> : <ListItemAvatar><img src={adresses.serverAdress + '/avatar/x.png'} style={{width: 50, height: 50}} /></ListItemAvatar>}
                                                <AddContactNameText primaryTypographyProps={{
                                                    style:{
                                                        fontFamily: 'Montserrat',
                                                        fontSize: 18,
                                                        fontWeight: 300
                                                    }
                                                }}>{user.first_name} {user.last_name}</AddContactNameText>
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <AddContactIcon color='#ffffffbb' />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    }
                                })}
                            </AddContactDialogList>
                        </Collapse>
                    </AddContactDialogContent>
                </Dialog>
            </MainContainer>
        )
    }
}