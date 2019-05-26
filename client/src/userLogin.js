import React from 'react';
import styled from 'styled-components';
const Logo = require('./images/logo.png');

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

export default class userLogin extends React.Component{
    render(){
        return(
            <MainContainer>
                <SignInContainer>
                    <AppLogoContainer>
                        <AppLogo src={Logo} alt />
                    </AppLogoContainer>
                    <InputContainer>
                        <Input type='text' placeholder='E-mail' />
                    </InputContainer>
                    <InputContainer>
                        <Input type='password' placeholder='Password' />
                    </InputContainer>
                    <ActionsContainer>
                        <SignInButton>
                            Sign In
                        </SignInButton>
                        <SignUpButton>
                            Sign Up
                        </SignUpButton>
                    </ActionsContainer>
                </SignInContainer>
            </MainContainer>
        )
    }
}