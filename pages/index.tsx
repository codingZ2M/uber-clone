import tw from "tailwind-styled-components"
import HeaderMenu from './components/HeaderMenu'
import {auth, onAuthStateChanged} from '../firebase/Firebase'
import {useEffect} from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  const router = useRouter();

  useEffect (  ()=> {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          router.push('/RideRequestHandler')
        }
    }  )
  },  );

  return (
    <HomeWrapper>
    <HeaderMenu/>
      <HeroBg src="/images/car_home_bg.jpg" alt="home_bg"/>
      <RequestRideButtonContainer>
            <span className="text-3xl sm:text-5xl text-white w-52 sm:w-full">Choose the ride you want</span>
            <Link href="/Login">
               <RequestRideButton>Sign up to ride </RequestRideButton>
            </Link>
      </RequestRideButtonContainer>
      <BookRentals>
        <ImgContainer>
            <Image src="/images/car_rentals.jpg" alt="car rentals" width={600} height={401} layout='fixed'/>
         </ImgContainer>
         <TextBox>
            <h1 className = 'text-4xl sm:text-6xl' >Rentals</h1>
            <span className="text-2xl w-screen sm:w-3/4">Book Rentals to save time with one car and driver for your multi-stop trips.</span>
            <span className="text-2xl cursor-pointer" >Learn More</span>
         </TextBox>
      </BookRentals>

      <BookIntercity>
         <TextBox >
         <h1 className = 'text-4xl sm:text-6xl' >Intercity</h1>
         <span className="text-2xl w-screen sm:w-3/4">Book Rentals to save time with one car and driver for your multi-stop trips.</span>
            <span className="text-2xl cursor-pointer" >Learn More</span>
         </TextBox>
         <ImgContainer>
            <Image src="/images/car_intercity.jpg" alt="car rentals" width={600} height={401} layout='fixed'/>
         </ImgContainer>
      </BookIntercity>

   </HomeWrapper>
   
  )
}

export default Home;

const HomeWrapper = tw.div`
   bg-white w-screen flex flex-col items-center justify-center box-border
`;

const HeroBg =tw.img`
   hidden sm:flex w-full h-full m-0 mt-14 sm:mt-0 mb-0 bg-cover bg-center bg-no-repeat
    opacity-100 brightness-75
`;
const RequestRideButtonContainer = tw.div`
     flex flex-col gap-10 items-center justify-center absolute 
     top-60 left-20 z-10 sm:top-96 sm:left-20 
      w-1/4 pl-20
`;
const RequestRideButton = tw.div`
     w-10/12 w-72 sm:w-96 h-12 bg-black text-white text-lg font-normal
     flex items-center justify-center cursor-pointer tracking-wide
`;

const BookRentals = tw.div`
  w-4/6 mt-12 mb-2 sm:mb-20 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0  
  place-items-center 
`;
const TextBox = tw.div`
   flex flex-col gap-4 sm:gap-12 sm:items-center pl-14
`;
const ImgContainer = tw.div`
   flex items-center
`;


const BookIntercity = tw(BookRentals)``;

/*
  
 
    
    
  */

