import {useState} from 'react'
import tw from "tailwind-styled-components"
import {FaTaxi, FaUserPlus} from "react-icons/fa";
import Link from 'next/link'

const RideRequest = () => {
        const [pickupLocation, setPickupLocation] = useState("");
        const [dropOffLocation, setDropOffLocation] = useState("");

  return (
      <RideRequestWrapper>
         
         <RideRequestContainer>
                <OptionContainer>
                    <RideBox>
                        <RideImage/>
                        <span>Ride</span>
                        <Line/>
                    </RideBox>
                    <DriveBox>
                        <DriveImage/>
                        <span>Drive</span>
                    </DriveBox>
                </OptionContainer>
                
                <h1>Request a ride now</h1>
                <InputContainer>
                    <Input placeholder='Enter pickup location' 
                            value={pickupLocation} 
                            onChange ={(e)=> setPickupLocation(e.target.value)}
                    />
                    <Input placeholder='Enter destination' 
                            value={dropOffLocation} 
                            onChange ={(e)=> setDropOffLocation(e.target.value)}
                    />
                    <Link href={{
                                pathname: "/RideRequestConfirm",
                                query: {
                                        pickup: pickupLocation,
                                        destination: dropOffLocation
                                }
                            }}
                    >
                    <RequestButton>Request Now</RequestButton>
                    </Link>
                </InputContainer>           
         </RideRequestContainer>

      </RideRequestWrapper>
  )
}

export default RideRequest

const RideRequestWrapper = tw.div`
    bg-white 
`;

const RideRequestContainer = tw.div`
    flex flex-col items-center justify-center bg-white 
    w-10/12 h-2/6   sm:w-4/12 sm:h-4/6
    absolute left-12 top-40 sm:left-32 sm:top-20
   h1 {
      text-4xl sm:text-5xl font-normal 
   }
`;
const OptionContainer = tw.div`
   flex gap-52 sm:gap-60 my-10 
`;
const RideBox = tw.div`
    span {
        text-xl 
}`;
const DriveBox = tw(RideBox)``;

const RideImage = tw(FaTaxi )`
   h-6 w-6 my-4
`;
const DriveImage = tw(FaUserPlus)`
   h-6 w-6 my-4
`;

const Line = tw.div`    
    flex w-16 h-1 bg-black my-4
`;
const InputContainer = tw.div`
    flex flex-col gap-2 pt-10 w-full sm:w-4/5
`;
const Input = tw.input`
     h-12 bg-slate-50 text-slate-500 text-lg p-4 flex items-center justify-center border border-slate-200
`;
const RequestButton = tw.div`
    h-14  my-6 bg-black text-white text-lg font-medium flex items-center justify-center cursor-pointer
`;
