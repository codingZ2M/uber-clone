import {useEffect, useState} from 'react'
import tw from "tailwind-styled-components"
import GoogleMap from "./components/GoogleMap";
import {useRouter} from 'next/router';
import Ride from './components/Ride';
import{BiRewind} from "react-icons/bi";
import Link from 'next/link'
import {auth, provider, signInWithPopup, onAuthStateChanged} from '../firebase/Firebase'
import HeaderMenu from './components/HeaderMenu'

const RideRequestConfirm = () => {

    const router = useRouter();
    const {pickup, destination} = router.query

        const [pickupLocationCoordinates, setPickupLocationCoordinates ] = useState([0,0]);
        const [destinationCoordinates, setDestinatesCoordinates ] = useState([0,0]);


    const getPickupCoordinates=(pickupLocation)=> {
    
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupLocation}.json?` + 
               new URLSearchParams({
                   access_token: "pk.eyJ1IjoiY29kaW5nejJtIiwiYSI6ImNsMHQ2MTlqZjBocnUzanF1MzE1Z2ExODgifQ.GcopJAGTMaYggH56UnJYfQ",
                   limit: 1
               }) 
        )
            .then(response => response.json())
            .then(data =>  {
                console.log(data);
                console.log("Pickup Location Coordinates: " + data.features[0].center)
                setPickupLocationCoordinates(data.features[0].center)
            })
    }
    

    const getDestinationCoordinates = (dropOffLocation) => {
        
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOffLocation}.json?` + 
               new URLSearchParams({
                   access_token: "pk.eyJ1IjoiY29kaW5nejJtIiwiYSI6ImNsMHQ2MTlqZjBocnUzanF1MzE1Z2ExODgifQ.GcopJAGTMaYggH56UnJYfQ",
                   limit: 1
               }) 
        )
            .then(response => response.json())
            .then(data =>  {
                console.log(data);
               console.log("Drop off Location Coordinates: " + data.features[0].center)
                setDestinatesCoordinates(data.features[0].center)
            })
    }

    useEffect( () => {
        
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                getPickupCoordinates(pickup);
                getDestinationCoordinates(destination);
            }
            else {
                router.push(`/Login`)
            }
        }  )
       
    }, [pickup, destination] )


  return (
    <RideConfirmWrapper>
        <HeaderMenu/>
        <GoogleMap
            pickupLocationCoordinates={pickupLocationCoordinates}
            destinationCoordinates={destinationCoordinates}
        />
        <BackButtonContainer>
             <Link href="/RideRequestHandler"><BackButton/></Link>
        </BackButtonContainer>    
        <ChooseRideContainer>

            <Ride  pickupLocationCoordinates={pickupLocationCoordinates}
            destinationCoordinates={destinationCoordinates}/>

            <RequestButtonContainer>
                <RequestButton>Request Go Intercity </RequestButton>
            </RequestButtonContainer>
        </ChooseRideContainer>

    </RideConfirmWrapper>
  )
}

export default RideRequestConfirm

const RideConfirmWrapper = tw.div`
    flex flex-col h-screen
`;
const BackButtonContainer   = tw.div`
    flex w-12 h-12 rounded-full bg-white mt-10
    absolute top-10 left-10 items-center justify-center
`;
const BackButton = tw(BiRewind)`
    px-4 w-20 h-20 cursor-pointer absolute 
`;
const ChooseRideContainer = tw.div`
    flex flex-col flex-1 pt-10 px-4 pb-6
`;
const RequestButtonContainer = tw.div`
    flex items-center justify-center py-6 
`;

const RequestButton = tw.div`
    w-10/12 sm:w-96 h-12 w-96 bg-black text-white text-lg font-medium flex items-center justify-center cursor-pointer
`;