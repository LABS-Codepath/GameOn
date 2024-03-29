import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Box, Center, Text, Divider, VStack, Stack, Container, useDisclosure, Heading} from "@chakra-ui/react"
import UsersProfileDetails from "./UsersProfileDetails"
import apiClient from "../../services/apiClient"
import UsersUpcomingEvents from "./UsersUpcomingEvents"
import UsersPreviousEvents from "./UsersPreviousEvents"
import UsersPostsFeed from "./UsersPostsFeed"
import { COLORS } from "../colors"

export default function UsersProfilePage() {
    const [viewedUser, setViewedUser] = useState({})
    const { userId } = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const curDate = new Date()
    curDate.setHours(0,0,0,0)
    let prevEvents = events?.filter(event => {return Date.parse(event.eventStartDate) < curDate.getTime()})
    let futureEvents = events?.filter(event => {return Date.parse(event.eventStartDate) >= curDate.getTime()})

    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await apiClient.fetchUserFromID(userId)
          if(data) {
            setViewedUser(data.user)
          }
          if (error) setError(error)
        }
        fetchUser()
      },[userId])

    useEffect(() => {
        const fetchUsersPosts = async () => {
            const { data, error } = await apiClient.listAllPostsByUserId(userId)
            if (data) {
                const newPosts = data.posts
                setPosts(data.posts)
            }
            if (error) setError(error)
        }

        fetchUsersPosts()
    }, [viewedUser.userId, userId])

    useEffect(() => {
        const getEvents = async () => {
        
            try {
              setTimeout(() => {
                
              }, 100)
              const response = await apiClient.fetchUsersEvents(userId)
              const eventData = response.data
              setEvents(eventData)
              setLoading(false)
            } catch(error) {
              return(error)
            }
          }
          getEvents()  
    },[])

    return (

        <Box overflow={"hidden"} style={{"backdropFilter": "blur(10px)", "background":"rgba(0, 0, 0, 0.05)"}} >
            <Box justifyContent={"center"} paddingX={{base:0, lg: "10%"}}>

            <Stack spacing={6}>
                <UsersProfileDetails viewedUser={viewedUser} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                
                <Divider orientation='horizontal' />
                    <UsersUpcomingEvents futureEvents={futureEvents} />

                <Divider orientation='horizontal' />
                    <UsersPreviousEvents prevEvents={prevEvents} />
                
                {/* <Divider orientation='horizontal' /> */}
                {/* <Heading fontFamily={"Roboto, sans-serif"} marginLeft={10} mb={2} color={COLORS.offWhite}>Posts</Heading> */}
                <Box height="auto" borderRadius='sm'>
                <Heading fontFamily={"Roboto, sans-serif"} marginLeft={4} mb={2} color={COLORS.offWhite}>Posts</Heading>
                    {
                        posts.length === 0 ? 
                        
                        <Box width={"100%"} height='100px'>
                            <Text marginLeft={6} fontSize='2xl' color={COLORS.offWhite} fontFamily={"mono, sans-serif"}>No Post Found</Text>
                         </Box>
                        : 
                        <UsersPostsFeed posts={posts} />
                    }
                </Box>

            </Stack>
            </Box>
        </Box>
    )
}
