import * as React from "react"
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import { EventContextProvider } from "../../contexts/event"
import Home from "../Home/Home"
import NavBar from "../NavBar/NavBar"
import UsersProfilePage from "../UsersProfilePage/UsersProfilePage"
import EventPage from "../Events/EventPage";
import Footer from "../Footer/Footer"
import background from "../../contexts/media/evo2.jpg"
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import EventFeed from "../Events/EventFeed";
import Bracket from "../Bracket/Bracket";

export default function AppContainer() {
    return (
      <AuthContextProvider>
        <EventContextProvider>
          <App />
        </EventContextProvider>
      </AuthContextProvider>
    )
}

function App(){
    const { user, setUser } = useAuthContext()

    return( 
        <ChakraProvider>
        {/* Need to come back to this because of background image */}
        <Box backgroundPosition={"bottom"} backgroundImage={background} backgroundRepeat={"repeat"} backgroundAttachment={"fixed"} backgroundSize={"125%"}>     
        <BrowserRouter>
        <NavBar/>
        <Routes>
        
            {/* Home */}
            <Route path="/" element={<Home/>}/>
            
            {/* ProfilePage <Route path="/profile/*" element={user?.email?<ProfilePage/>:<></>}/>*/}

            {/* EventFeed */}
            <Route path={"/events/:eventId"} element={<EventPage />}/>
            <Route path={"/events"} element={<EventFeed />}/>

            {/* OtherUserProfilePage */}
            <Route path={"/user/:userId/profile/*"} element={<UsersProfilePage />} />

            {/* OtherUserProfilePage */}
            <Route path={"/bracket/*"} element={<Bracket />} />

        </Routes>

        {/* Footer */}
        <Footer/>
        </BrowserRouter>
        </Box> 
        </ChakraProvider>
        
    )
}