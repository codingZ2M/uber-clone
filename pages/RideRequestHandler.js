import React from 'react'
import RideRequest from './components/RideRequest'
import HeaderMenu from './components/HeaderMenu'
import {useEffect} from 'react'
import { useRouter } from "next/router"
import {auth, onAuthStateChanged} from '../firebase/Firebase'

const RideRequestHandler = () => {
  
  const router = useRouter();

  useEffect (  ()=> {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            router.push(`/`)
        }
    }  )
},  );


  return (
    <div>
       <HeaderMenu/>
       <RideRequest/>
    </div>
  )
}

export default RideRequestHandler
