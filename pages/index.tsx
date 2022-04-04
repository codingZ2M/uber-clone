import tw from "tailwind-styled-components"
import HeaderMenu from './components/HeaderMenu'
import {auth, onAuthStateChanged} from '../firebase/Firebase'
import {useEffect} from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image'

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
      
      <BookRentals>
        <ImgContainer>
            <Image src="/images/car_rentals.jpg" alt="car rentals" width={600} height={401} layout='fixed'/>
         </ImgContainer>
         <TextBox>
            <h1 className = 'text-6xl' >Rentals</h1>
            <span className="text-xl w-3/4">Book Rentals to save time with one car and driver for your multi-stop trips.</span>
            <span className="text-xl cursor-pointer" >Learn More</span>
         </TextBox>
      </BookRentals>

      <BookIntercity>
         <TextBox className=" flex flex-col gap-12  justify-center ">
            <h1 className = 'text-6xl' >Intercity</h1>
            <span className="text-xl w-3/4">Book Rentals to save time with one car and driver for your multi-stop trips.</span>
            <span className="text-xl cursor-pointer" >Learn More</span>
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
   bg-white w-screen flex flex-col items-center justify-center box-content
`;

const HeroBg =tw.img`
  relative w-full h-full m-0 mt-14 sm:mt-0 mb-6 bg-cover bg-center bg-no-repeat 
`;

const BookRentals = tw.div`
  w-4/6 mt-12 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-0  
  place-items-center 
`;
const TextBox = tw.div`
   flex flex-col gap-12 items-center 
`;
const ImgContainer = tw.div`
   flex items-center
`;


const BookIntercity = tw(BookRentals)``;

/*
  
 
    
    
  */

