import {useEffect, useState} from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/link'
import {FaUserLock} from "react-icons/fa";
import {BiX, BiMenu}  from "react-icons/bi";
import MenuItems from '../../data/MenuItems'
import Image from 'next/image'
import { useRouter } from "next/router"
import {auth, onAuthStateChanged, signOut} from '../../firebase/Firebase'

const HeaderMenu = () => {
  const [closeButtonOpen, setCloseButtonOpen] = useState(false);
  const [signedUser, setSignedUser] = useState('');
  const router = useRouter();
    
  useEffect (  ()=> {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setSignedUser(user);
        }
    }  )
  }, []  );

    const handleAuth = () => {
      if (signedUser){
            signOut(auth).then( ()=> {
             router.push('/')
            
         }).catch((error)=> {
             alert(error.message);
         })
        }
    }
    
  return (
    <MenuContainer>
        <Link href ="/">
            <Logo>Uber</Logo>
        </Link>  

        <MenuCenter> 
            <Link href= "/company">Company</Link>
            <Link href= "/safety">Safety</Link>
            <Link href= "/ride">Ride</Link>
            <Link href= "/drive">Drive</Link>
            <Link href= "/offerings">Our Offerings</Link>
            <Link href= "/newsroom">News Room</Link>
            <Link href= "/blog">Blog</Link>
            <Link href= "/careers">Careers</Link>
            <Link href= "/covid19">Covid-19 Resources</Link>
            <Link href= "/more">More</Link>
        </MenuCenter>

        <MenuRight>
            <Link href="/help">Help</Link>
            { 
                !signedUser ? 
            <LoginBox>
                <FaUserLock/>
                <Link href="/Login">Login</Link>
            </LoginBox>
               :
               <>
               <SignOut>
                   <Image src={signedUser.photoURL} alt="User" className="rounded-full" width={40} height={40} />
                   <SignOutBox>
                      <span onClick={handleAuth} className="" >Sign Out</span>
                   </SignOutBox>
               </SignOut>
               </>
               }
            <HamburgerIcon onClick={() => setCloseButtonOpen(true)}/>
        </MenuRight>

        <SidebarMenu show={closeButtonOpen}>
          <CloseButtonWrapper >
              <CloseButton  onClick={() => setCloseButtonOpen(false)} />
          </CloseButtonWrapper>
          { MenuItems && MenuItems.map ( (menuItem, index) =>(
               <li><Link key ={index} href="">{menuItem}</Link></li>
          ) )}
        </SidebarMenu>

 </MenuContainer>
  )
}

export default HeaderMenu

const MenuContainer = tw.div`
  flex items-center justify-between fixed top-0 left-0 right-0 
  pl-8 pr-4  py-0 h-14 z-10 bg-black text-white
`;
const Logo = tw.span`
  text-3xl text-white cursor-pointer
`;
const MenuCenter = tw.div`
  flex items-center justify-between gap-10 text-small
  a {
    font-normal
  }
  @media (max-width: 768px) {
    hidden sm:flex
    }
`;  

const MenuRight = tw.div`
  flex items-center justify-between gap-2 text-small
  a {
    font-normal
  }
  @media (max-width: 768px) {
    flex justify-end gap-5
    }
`;
const LoginBox = tw.div`
  flex gap-2 items-center justify-between
`;
const SignOut = tw.div`
    flex absolute top-2.5 right-4 
    justify-between z-10 items-center cursor-pointer group
`;

const SignOutBox = tw.div`
    absolute top-8 right-2 bg-black text-white border border-bg-white 
    rounded-md w-20 h-8 flex items-center justify-center text-base 
    opacity-0 group-hover:opacity-100
`;

const SidebarMenu = tw.div`
  flex flex-col gap-6 pr-10 text-right pt-8
  fixed top-0 bottom-0 right-0  list-none bg-white w-80 z-10 text-black 
  a {
    font-medium
  }
  ${props => props.show ? 'translate-x-0' : 'translate-x-full' }
  transition ease-in-out delay-150
`;
const HamburgerIcon = tw(BiMenu)`
   w-8 h-8 cursor-pointer text-white
`;

const CloseButtonWrapper = tw.div`
  flex justify-end
`;

const CloseButton = tw(BiX)`
   w-10 h-10 cursor-pointer text-black
`;