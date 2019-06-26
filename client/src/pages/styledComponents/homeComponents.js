import styled from 'styled-components';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListSubheader, ListItemText, TextField } from '@material-ui/core';
import { Settings, Info, PowerSettingsNew, PersonAdd, Search } from '@material-ui/icons';

//Container with all components inside
const MainContainer = styled.section`
    display: flex;
    background-color: #f7f3ed;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
`

//SideBar container with first name, last name, avatar, contacts etc.
const SideBarContainer = styled.div`
    display: flex;
    flex: ${props => props.flex};
    height: 100vh;
    background-color: #D2D2D2;
    flex-direction: column;
`

const MessagesContainer = styled.div`
    display: flex;
    flex: 10;
    height: 100vh;
`

//User avatar container
const AvatarContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`

//User avatar
const AvatarImage = styled.img`
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
`

const UserName = styled.div`
    justify-content: center;
    text-align: center;

    font-size: 24px;
    font-weight: 400;
    font-family: Montserrat;
    color: #494949;
    border-bottom: .5px solid #B0B0B0;
    padding-top: 20px;
    padding-bottom: 20px;
`

//Contacts

//Container
const ContactsContainer = styled.div`
    flex: 10;
    padding-top: 20px;
    padding-bottom: 20px;
`

//List
const ContactsList = styled(List)`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    white-space: ellipse;

    ::-webkit-scrollbar{
        width: 7px;
        background-color: #00000000;
    }

    ::-webkit-scrollbar-thumb{
        width: 7px;
        border-radius: 10px;
        background-color: #22222288;
    }

    ::-webkit-scrollbar-thumb:hover{
        background-color: #222222aa;
    }
`

//Item
const ContactsItem = styled(ListItem)`
    font-family: Montserrat;
    font-size: 14px;
    background-color: #00000000;
    transition-duration: 100ms;

    :hover{
        background-color: #00000022;
        cursor: pointer;
    }

    ::selection{
        color: #000000;
        background-color: #00000000;
    }

    ::-moz-selection{
        color: #000000;
        background-color: #00000000;
    }
`

//Options

//Container
const OptionsContainer = styled.div`
    flex: 1;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

//Universal options icon button
const OptionsButton = styled(IconButton)`
    flex: 1;
    text-align: center;
`

//Icons
const SettingsIcon = styled(Settings)`
    color: #4B4B4B;
`

const AddContactIcon = styled(PersonAdd)`
    color: ${props => props.color || '#4B4B4B'};
`

const LogoutIcon = styled(PowerSettingsNew)`
    color: #4B4B4B;
`

//Dialogs
const LogoutDialogContent = styled(DialogContent)`
    color: #ffffffdd;
    font-size: 20px;
    font-family: Montserrat;
    font-weight: 500;
`

//Add contact
const AddContactDialogTitle = styled(DialogTitle)`
    font-family: Montserrat;
    font-weight: 400;
    font-size: 20px;
    color: #ffffffdd
`

const AddContactDialogContent = styled(DialogContent)`
    color: #ffffffdd;
    display: flex;
    flex-direction: column;
`

const AddContactDialogSearchBarContainer = styled.div`
    display: flex;
    color: #ffffffdd;
    border-radius: 5px;
    background-color: #101010;
    padding: 5px;
`

const AddContactDialogSearchBar = styled.input`
    font-family: Montserrat;
    flex-grow: 1;
    color: #ffffffdd;
    border: none;
    background-color: #00000000;
    font-size: 16px;
    font-weight: 300;

    :focus{
        outline: none;
    }

    ::placeholder{
        color: #ffffff33;
    }

    ::-webkit-input-placeholder{
        color: #ffffff99;
    }
`

const AddContactDialogSearchIcon = styled(Search)`
    color: #ffffff99;
    margin-right: 5px;
    margin-left: 5px;
`

const AddContactDialogList = styled(List)`
    flex-grow: 1;
    width: 100%;
    height: 100%;
`

//To fill
const AddContactNameText = styled(ListItemText)`
    
`

export {
    MainContainer,
    SideBarContainer,
    MessagesContainer,
    AvatarContainer,
    AvatarImage,
    UserName,
    ContactsContainer,
    ContactsItem,
    ContactsList,
    OptionsButton,
    OptionsContainer,
    SettingsIcon,
    AddContactIcon,
    LogoutIcon,
    LogoutDialogContent,
    AddContactDialogTitle,
    AddContactDialogContent,
    AddContactDialogSearchBar,
    AddContactDialogSearchBarContainer,
    AddContactDialogSearchIcon,
    AddContactDialogList,
    AddContactNameText
}