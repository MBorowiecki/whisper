import React from 'react';
import styled from 'styled-components';
import adresses from '../config/adresses';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { CircularProgress, Snackbar, SnackbarContent, IconButton, Slide } from '@material-ui/core'
import { Close } from '@material-ui/icons';

const Logo = require('../images/logo.png');

//Styled components

//Container with all components inside
const MainContainer = styled.section`
    display: flex;
    background-color: #f7f3ed;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`

//Container with signin inputs inside
const SignInContainer = styled.section`
    width: 300px;
    height: 250px;
    display: flex;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 20px #00000028;
`

//Container with signupinputs inside
const SignUpContainer = styled.div`
    width: 300px;
    height: 400px;
    display: flex;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 20px #00000028;

    margin-left: 20px;
`

//App logo
const AppLogoContainer = styled.div`
    flex: 1;
    text-align: center;
`

//App logo
const AppLogo = styled.img`
    object-fit: center;
    height: 70px;
    width: 70px;
`

//Email container
const InputContainer = styled.div`
    padding: 0px;
    flex: 2;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

//Input
const Input = styled.input`
    padding: 10px;
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 300;
    border-radius: 5px;
    border: .5px solid #6b6b6b;
    width: 100%;
`

//Action buttons container
const ActionsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
`
//SignIn button
const SignInButton = styled.button`
    flex: 1;
    background-color: #864CE6;
    border-radius: 5px;
    border: none;
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 300;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    color: #ffffff;
    transition-duration: 50ms;

    :hover{
        cursor: pointer;
        background-color: #7342C4;
    }
`

//SignIn progress
const SignInCircularProgress = styled(CircularProgress)`
    
`

//SignUp button
const SignUpButton = styled.button`
    flex: 1;
    background-color: #ffffff00;
    color: #565656;
    border-radius: 5px;
    margin-left: 10px;
    border: 0px;

    :hover{
        cursor: pointer;
        background-color: #f4f4f4;
    }
`

//SignUpTextContainer
const SignUpTextContainer = styled.div`
    flex: 1;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
`

export default class userLogin extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            logged: false,
            logging: false,
            messagesSnackbarOpen: false,
            messagesSnackbarMessage: '',
            messagesSnackbarVariant: 'success',
            signUpContainerOpen: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signingUp: false
        };
    }

    signInUser(){
        this.setState({
            logging: true
        })
        axios.post(adresses.serverAdress + '/auth/local', {email: this.state.email, password: this.state.password})
        .then((res) => {
            if(res.status === 200){
                window.sessionStorage.setItem('jwt', res.data.jwt);
                window.sessionStorage.setItem('first_name', res.data.user.first_name)
                window.sessionStorage.setItem('last_name', res.data.user.last_name)
                window.sessionStorage.setItem('email', res.data.user.email)
                window.sessionStorage.setItem('_id', res.data.user._id)
                if(res.data.user.avatar_name){
                    window.sessionStorage.setItem('avatar_name', res.data.user.avatar_name)
                }
                
                this.setState({
                    logging: false,
                    logged: true
                })
            }else if(res.status === 500){
                console.log('Problem with server. Contact with support.')
                this.setState({
                    messagesSnackbarMessage: 'Problem with server. Please, contact support.',
                    messagesSnackbarOpen: true,
                    logging: false
                })
            }else if(res.status === 204){
                console.log('No account with this email or password.')
                this.setState({
                    messagesSnackbarMessage: 'Incorrect email or password.',
                    messagesSnackbarOpen: true,
                    logging: false
                })
            }else if(res.status === 406){
                console.log('No body.')
                this.setState({
                    messagesSnackbarMessage: 'No user data.',
                    messagesSnackbarOpen: true,
                    logging: false
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    signUpUser(){
        if( this.state.signUpEmail !== '' &&
            this.state.signUpFirstName !== '' &&
            this.state.signUpLastName !== '' &&
            this.state.signUpPassword !== '' ){
                this.setState({
                    signingUp: true
                })

                axios.post(adresses.serverAdress + '/auth/local/signup', {email: this.state.signUpEmail, password: this.state.signUpPassword, first_name: this.state.signUpFirstName, last_name: this.state.signUpLastName})
                .then((res) => {
                    if(res.status === 201){
                        this.setState({
                            messagesSnackbarMessage: 'Succesfully created your account.',
                            messagesSnackbarOpen: true,
                            signingUp: false
                        })
                    }else if(res.status === 226){
                        this.setState({
                            messagesSnackbarMessage: 'This email is already taken.',
                            messagesSnackbarOpen: true,
                            signingUp: false
                        })
                    }
                })
                .catch((err) => {
                    if(err){
                        console.log(err)
                        this.setState({
                            messagesSnackbarMessage: 'Something went wrong. Please contact support.',
                            messagesSnackbarOpen: true,
                            signingUp: false
                        })
                    }
                })
            }
    }

    handleChange(state){
        //Inverts state
        this.setState({
            [state]: !this.state[state]
        })
    }

    render(){
        if(this.state.logged){
            return(
                <Redirect to='/messages/home' />
            )
        }

        return(
            <MainContainer>
                <SignInContainer>
                    <AppLogoContainer>
                        <AppLogo src={Logo} alt='whisper-logo' />
                    </AppLogoContainer>
                    <InputContainer>
                        <Input type='text' placeholder='E-mail' onChange={(e) => {this.setState({email: e.target.value})}}/>
                    </InputContainer>
                    <InputContainer>
                        <Input type='password' placeholder='Password' onChange={(e) => {this.setState({password: e.target.value})}} />
                    </InputContainer>
                    <ActionsContainer>
                        <SignInButton onClick={() => this.signInUser()} disabled={this.state.logging}>
                            {this.state.logging ? <SignInCircularProgress size={18} color='#ffffff' /> : "Sign In"}
                        </SignInButton>
                        <SignUpButton onClick={() => this.handleChange('signUpContainerOpen')}>
                            Sign Up
                        </SignUpButton>
                    </ActionsContainer>
                </SignInContainer>

                <Slide
                    in={this.state.signUpContainerOpen}
                    direction='left'
                    mountOnEnter
                    unmountOnExit
                >
                    <SignUpContainer>
                        <SignUpTextContainer>
                            Sign Up
                        </SignUpTextContainer>
                        <InputContainer>
                            <Input type='text' placeholder='First name' onChange={(e) => {this.setState({signUpFirstName: e.target.value})}}/>
                        </InputContainer>
                        <InputContainer>
                            <Input type='text' placeholder='Last name' onChange={(e) => {this.setState({signUpLastName: e.target.value})}}/>
                        </InputContainer>
                        <InputContainer>
                            <Input type='text' placeholder='E-mail' onChange={(e) => {this.setState({signUpEmail: e.target.value})}}/>
                        </InputContainer>
                        <InputContainer>
                            <Input type='password' placeholder='Password' onChange={(e) => {this.setState({signUpPassword: e.target.value})}} />
                        </InputContainer>
                        <ActionsContainer>
                            <SignInButton onClick={() => this.signUpUser()} disabled={this.state.signingUp}>
                                {this.state.signingUp ? <SignInCircularProgress size={18} color='#ffffff' /> : "Sign Up"}
                            </SignInButton>
                        </ActionsContainer>
                    </SignUpContainer>
                </Slide>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.state.messagesSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => this.handleChange('messagesSnackbarOpen')}
                >
                    <SnackbarContent
                        style={{backgroundColor: '#aa0000'}}
                        message={
                            <div style={{color: '#ffffff', fontFamily: 'Montserrat', fontSize: 16, fontWeight: 400}}>
                                {this.state.messagesSnackbarMessage}
                            </div>
                        }
                        action={[
                            <IconButton onClick={() => this.handleChange('messagesSnackbarOpen')}>
                                <Close style={{color: '#ffffff'}} />
                            </IconButton>
                        ]}
                    />
                </Snackbar>
            </MainContainer>
        )
    }
}