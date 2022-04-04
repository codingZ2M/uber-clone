import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from "next/router"
import tw from "tailwind-styled-components"
import {auth, provider, signInWithPopup, onAuthStateChanged} from '../firebase/Firebase'
import HeaderMenu from './components/HeaderMenu'

export default function Login() {

    const router = useRouter();

    useEffect (  ()=> {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                router.push(`/RideRequestHandler`)
            }
        }  )    
    }, []  );


    const handleAuth = () => { 
            signInWithPopup(auth, provider).then( (result) => {
              console.log(result);
              router.push("/RideRequestHandler")
              }).catch((error)=> {
                 alert(error.message);
             })
    }

    return (
        <SigninContainer>
            <HeaderMenu/>
            <SigninBox>
                <Heading>Sign In</Heading>
                <FormContainer>
                    <FormBox>
                        <Input type="text" placeholder="Email or Phone Number" required/>
                        <Input type="text" placeholder="Password" required />
                        <SigninButton onClick="">Sign In</SigninButton>
                        <TextHelp>Need Help? </TextHelp>
                        <GoogleSigninButton onClick={handleAuth}>
                            <Image src="/images/google.svg" alt="User" width={40} height={40}/>
                             Sign In with Google
                        </GoogleSigninButton>
                        <TextSignup>New to Uber
                            ? Sign up now </TextSignup>
                        <Paragraph>
                            This page is protected by Google reCAPTCHA to ensure youre not a bot. Learn more
                        </Paragraph>
                    </FormBox>
                </FormContainer>
            </SigninBox>
        </SigninContainer>
    )
}

const SigninContainer = tw.div`
     flex w-full h-full items-center justify-center bg-white
`;
const SigninBox = tw.div`
    absolute top-32 bg-black w-10/12 sm:w-4/12 h-3/4 z-10  border-none 
`;
const Heading = tw.h1`
    p-10 text-3xl text-white
`;
const FormContainer = tw.form``;

const FormBox = tw.div`
    flex flex-col items-center justify-center w-full mt-1'
`;

const Input = tw.input`
    w-80 sm:w-96 h-12 p-3 text-lg text-white border-none bg-zinc-900 rounded-sm mb-8
`;
    
const SigninButton = tw.button`
    flex justify-center items-center text-lg text-black
    bg-white h-12 w-80 sm:w-96  rounded-sm cursor-pointer
`;
    
const TextHelp = tw.span`
    text-sm tracking-wide text-white no-underline my-3
`;
const GoogleSigninButton = tw.button`
    w-80 sm:w-96 h-12 rounded-sm border-none
    flex gap-1 items-center justify-center bg-white
    text-black text-lg my-4
`;

const TextSignup = tw.span`
    text-sm tracking-wide text-white no-underline my-2 font-semibold
`;

const Paragraph = tw.p`
    pb-9 text-sm tracking-wide text-white no-underline my-2 w-80 sm:w-96
`;
    
   

    
  
