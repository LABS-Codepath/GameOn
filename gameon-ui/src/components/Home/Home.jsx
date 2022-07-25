import * as React from "react"
import Hero from "../Hero/Hero"
import EventFeed from "../Events/EventFeed"
import { Image, Container, Spacer } from "@chakra-ui/react"

export default function Home(){
    return (
    
            <Container centerContent minWidth="95vw" >
                <Hero />
                <Spacer/>
                <EventFeed />
            </Container>
            
        
    )
}

// function Swipershow() {
//   return (
//     <>
//       <Swiper
//         spaceBetween={30}
//         effect={"fade"}
//         navigation={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[EffectFade, Navigation, Pagination]}
//       >
//         <SwiperSlide>
//           <Image src={pic}/>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Image src={elmo}/>
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }