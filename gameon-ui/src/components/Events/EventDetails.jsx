import * as React from "react"
import EventRegistration from "../Events/EventRegistration"
import PostsForm from "../Posts/PostsForm"
import PostsFeed from "../Posts/PostsFeed"
import { useState, useEffect } from "react"
import { useAuthContext } from '../../contexts/auth'
import { 
    Box, Text, SimpleGrid, Flex, Button,
    Image, VStack, Heading, Stack, Modal,
    Icon, HStack, useColorModeValue, useDisclosure, Center, Divider 
} from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import { HiLocationMarker } from "react-icons/hi"
import { useRef } from "react"
import LoginPage from "../LoginPage/LoginPage"
import apiClient from '../../services/apiClient';
import RegisterPage from "../RegisterPage/RegisterPage"
import {COLORS} from "../colors"

export default function EventDetails({event, games, eventId, posts}) {
    const noImage = "https://image.shutterstock.com/shutterstock/photos/571752970/display_1500/stock-photo-no-game-sign-on-white-background-571752970.jpg"
    const { user } = useAuthContext()
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
    let startDate = event.eventStartDate
    let newStartDate = new Date(startDate)
    let myStartDate = newStartDate.toDateString()

    let endDate = event.eventEndDate
    let newEndDate = new Date(endDate)
    let myEndDate = newEndDate.toDateString()

  const [isHovering, setIsHovering] = useState(false)

  const [checkedItems, setCheckedItems] = useState([])
  const [errors, setErrors] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [gamesRegistered, setGamesRegistered] = useState()

    const btnRef = useRef()

    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    useEffect(() => {  
        const setItems = async() => {
          if(games) {
            setCheckedItems(new Array(games.length).fill(false))
          }
        }
        setItems()
    
        const getIsRegistered = async() => {
          const { data, error } = await apiClient.isUserRegistered(eventId, user.id)
           if(data) {
            setErrors(null)
            setIsRegistered(true)
            setGamesRegistered(data.isRegistered[0].eventGamesRegisteredFor)
           }
           if (error) {
            setErrors(error)
            setIsRegistered(false)
           }   
        }
        getIsRegistered()
      }, [games, user.id, eventId]);

    return(
        <Box style={{"backdropFilter": "blur(6px)"}}>        
            <Box width={"100%"} backgroundColor={COLORS.offWhite} px={5}>

            <SimpleGrid 
            column={{base:1, lg:2}}
            spacing={{base:8, md: 10}}
            pt={{base:10, md:14}}
            >
            
            <Stack spacing={{base:6, md:10}} fontFamily={"mono, sans-serif"}>
                <Flex paddingLeft={"1rem"} borderRadius={"15px"} background={"rgba(230, 230, 230, 0.9)"} minW={0} alignItems={"flex-start"} flexGrow={1} flexDirection={"row"}>
                    <Image
                    src={event?.eventImageUrl} 
                    boxSize={"80px"} 
                    alignItems={"center"} 
                    flexGrow={0} flexShrink={0} flexBasis={"auto"} borderRadius={"50%"}
                    />
                <Box marginLeft={2} flexGrow={1} flexShrink={1} flexBasis={"auto"}>
                    {/* Type */}
                    <Text
                        color={"hsl(0,0%,50%)"}
                        fontWeight={400}
                        fontSize={{base:"xl", sm:"lg", lg:"2xl"}}
                        textTransform={"uppercase"}
                    >{
                        event.eventType
                    }</Text>
                    {/* Event Name */}
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{base:"2xl", sm:"lg", lg:"4xl"}}
                        textTransform={"uppercase"}
                    >{event.eventName}
                    </Heading>
                    
                    <HStack spacing={"10px"} >
                    {/* Date */}
                    <Icon as={CalendarIcon} color={COLORS.darkAmethyst}/>    
                    <Text
                        color={"hsl(255, 23%, 10%)"}
                        fontWeight={300}
                        fontSize={"md"}
                    >
                    {myStartDate <= myEndDate? myStartDate : myStartDate + " - " + myEndDate 
                    }</Text>
                    </HStack>
                    {/* Location */}
                    <HStack>
                    <Icon as={HiLocationMarker} color={COLORS.darkAmethyst}/>
                    <Text
                        color={"hsl(255, 23%, 10%)"}
                        fontWeight={300}
                        fontSize={"md"}
                    > 
                        {
                            event.eventLocation
                        }
                    </Text>

                    </HStack>
                </Box>
                </Flex>


            </Stack>
            </SimpleGrid>
                {/* Event */}
                <Box position={"relative"} py={"25px"}>
                    <Stack paddingTop={"1rem"}>

                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                    <Box textAlign={"left"} mx={5}>
                        <Text position={"relative"} fontSize={"3xl"} fontFamily={"Roboto, sans-serif"} fontWeight={300} textTransform={'uppercase'} mb={4}>Event Registration:</Text>             
                    </Box>
                </Stack>
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                
                        <Box textAlign={"left"} mx={5}>         
                            {
                                user.email 
                                    ?   
                                        <>  
                                            {isRegistered 
                                                ?   <>
                                                    <Text>You are already registered! We'll see you there!</Text>
                                                    <br></br>
                                                    <Text>Registered games:</Text>
                                                    {
                                                        gamesRegistered?.map((gameId) => {
                                                            return (
                                                                <Text>
                                                                    {games?.map((game) => {
                                                                        if(game.gameId === gameId) {
                                                                            return game.gameName
                                                                        }
                                                                    })}
                                                                </Text>
                                                            )
                                                        })
                                                    }
                                                    </>
                                                : 
                                                    null
                                            }
                                            <EventRegistration 
                                                event={event} 
                                                games={games}
                                                setErrors={setErrors} 
                                                setIsRegistered={setIsRegistered}
                                                setCheckedItems={setCheckedItems} 
                                                checkedItems={checkedItems}
                                                isRegistered={isRegistered}
                                                /> 
                                        </>
                                        
                                    : 
                                        <Text>
                                            You must 
                                                <Button onClick={onRegisterOpen} variant={"link"} mx={1}>Sign Up</Button>
                                            or 
                                                <Button onClick={onLoginOpen} variant={"link"} mx={1}>Login</Button> 
                                            to register. 
                                        </Text>
                            }
                        </Box>
                        </Stack>
                            <Modal isCentered isOpen={isLoginOpen} onClose={onLoginClose} finalFocusRef={btnRef}><LoginPage onClose={onLoginClose} isOpen={isLoginOpen} finalFocusRef={btnRef} /></Modal>
                            <Modal isCentered isOpen={isRegisterOpen} onClose={onRegisterClose} finalFocusRef={btnRef}><RegisterPage onClose={onRegisterClose} /></Modal>
                    </Stack>
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                <Box textAlign={"left"} mx={5}>
                        <Text position={"relative"} fontSize={"3xl"} fontFamily={"Roboto, sans-serif"} fontWeight={300} textTransform={'uppercase'} mb={4}>Details:</Text>
                        <Text whiteSpace= "pre-wrap" fontSize={'md'} fontFamily={"mono, sans-serif"} padding={"4px"}>{event.eventDetails}</Text>                    
                </Box>
                </Stack>

                </Box>
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                    <Text mx={5} position={"relative"} fontSize={"3xl"} fontFamily={"Roboto, sans-serif"} fontWeight={300} textTransform={'uppercase'} mb={4}>Featured Games:</Text>
                    <HStack justifyContent={"space-evenly"}>
                    {/* Game */}
                    <Flex justifyContent={"center"} flexDirection={"row"} flexWrap={"wrap"} gap={6}>

                    {games?.map((game, index) => (
                    <Box width={"264px"} height={"354px"}
                    background={"rgba(113, 57, 166, 0.7)"}
                    display={"block"}
                    alignItems={"center"}  
                    borderRadius='lg' 
                    overflow='hidden' 
                    boxShadow={'md'} 
                    _hover={{"transform": "scale3d(1.05, 1.05, 1)" }}
                    sx={{"& .gameInfo":{opacity:0, transition:"all .2s"}, "&:hover .gameInfo":{opacity:100}}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    >   

                        <Box width={"264px"} height={"354px"} >
                            <Box className="gameInfo" borderRadius={"lg"} zIndex={1} padding={2} width={"264px"} height={"354px"} opacity={10} backgroundColor={'blackAlpha.700'} textColor={"white"} position={'absolute'} overflowY={'auto'}
                                      css={{
                                        '&::-webkit-scrollbar': {
                                          width: '6px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                          width: '8px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#805AD5',
                                          borderRadius: '24px',
                                        },}}>
                                            <Heading py={2} color={COLORS.offWhite} textAlign={"center"} size='sm'>{game?.gameName}</Heading>
                                            <Text >{game?.gameSummary}</Text></Box>
                            <Box width={"264px"} height={"354px"} zIndex={0} position={'relative'} _hover={{bg:"black"}} >
                            <Image
                            display={"block"}
                            marginLeft={"auto"}
                            marginRight={"auto"}
                            objectFit={"fill"} 
                            borderTopRadius={"lg"}
                            
                            src={game?.gameImageUrl?.replace("thumb", "cover_big")} 
                            alt={noImage}
                            />
                            </Box>
                        </Box> 
       
                    </Box>
                    ))}
                    </Flex>
                    </HStack>
                </Stack>
                </Box>
                <PostsForm user={user} event={event} eventId={eventId} />
                <PostsFeed eventId={eventId} posts={posts} />
            
        </Box>
    )
}