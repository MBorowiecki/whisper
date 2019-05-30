//Libraries imports
import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { IconButton } from '@material-ui/core';
import { Settings, Info, PowerSettingsNew } from '@material-ui/icons';

//Config imports
import adresses from '../config/adresses';

//Styled components

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
    padding: 20px;
`

//Options

//Container
const OptionsContainer = styled.div`
    flex: 1;
    padding: 20px;
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

const InfoIcon = styled(Info)`
    color: #4B4B4B;
`

const LogoutIcon = styled(PowerSettingsNew)`
    color: #4B4B4B;
`

export default class Home extends React.Component{
    constructor(){
        super();

        this.state = {
            logged: true,
            sideBarFlex: 2,
        }
    }

    componentDidMount(){
        this.checkToken()
        this.updateWindowSize()
        window.addEventListener('resize', this.updateWindowSize.bind(this))
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
            console.log(dateNow.getTime() / 1000, decodedToken.payload.exp)
            if(decodedToken.payload.exp < dateNow.getTime() / 1000){
                console.log(decodedToken.payload.exp < dateNow.getTime())
                this.setState({
                    logged: false
                })
            }else{
                console.log(decodedToken.payload.exp < dateNow.getTime())
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

    logout(){
        window.sessionStorage.clear();
        this.setState({
            logged: false
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

                    </ContactsContainer>
                    <OptionsContainer>
                        <OptionsButton>
                            <SettingsIcon />
                        </OptionsButton>
                        <OptionsButton>
                            <InfoIcon />
                        </OptionsButton>
                        <OptionsButton onClick={() => this.logout()}>
                            <LogoutIcon />
                        </OptionsButton>
                    </OptionsContainer>
                </SideBarContainer>
                <MessagesContainer>

                </MessagesContainer>
            </MainContainer>
        )
    }
}