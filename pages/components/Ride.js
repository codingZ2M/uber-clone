import React, {useEffect, useState} from 'react'
import tw from "tailwind-styled-components"
import CarsList from '../../data/CarsList'
import Image from 'next/image'

const Ride = ({pickupLocationCoordinates, destinationCoordinates}) => {

   const [rideDuration, setRideDuration] = useState(0);
      
   // Obtaining pickup coordinates (x & y axis)
   useEffect( ()=> {
      
      //https://docs.mapbox.com/api/navigation/directions/
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLocationCoordinates[0]}, ${pickupLocationCoordinates[1]};${destinationCoordinates[0]}, ${destinationCoordinates[1]}?access_token=pk.eyJ1IjoiY29kaW5nejJtIiwiYSI6ImNsMHQ2MTlqZjBocnUzanF1MzE1Z2ExODgifQ.GcopJAGTMaYggH56UnJYfQ`
      ).then( (response) => response.json())
       .then( data => {
         try {
          // Considering only route A
          setRideDuration(data.routes[0].duration / 100)
          console.log(data);
         } catch(error) {
            console.log(error)
        }
       })
      
   }, [pickupLocationCoordinates, destinationCoordinates])


  return (
    <RideWrapper>

         <CarList>
         {
                  CarsList.map((car, index) => (
             <CarItem key={index}>
                <Image src= {`/images/${car.carImage}`} alt="Car Image"  width={100} height={58} />
                <CarDetails>
                   <CarService>{car.carService}</CarService>
                   <Desc>{car. description}</Desc>
                </CarDetails>
                <Price>{'$' + (rideDuration * car.multiplier).toFixed(2) }</Price>
             </CarItem> 
             ))
            }     
        </CarList>   

    </RideWrapper>
  )
}

export default Ride;

const RideWrapper = tw.div`
    flex-1 
`;

const CarList = tw.div`
   flex flex-col gap-12 pb-6 
`;

const CarItem = tw.div`
   flex gap-4 w-full sm:w-2/4 justify-between
`;

const CarDetails = tw.div`
   flex flex-col gap-1 w-1/2 
`;
const CarService = tw.span`
   text-xl font-medium
`;
const Desc = tw.span`
   text-small leading-4
`;
const Price = tw.span`
   text-xl
`;