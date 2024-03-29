import * as React from 'react';
import {
  Image, Link,
  Container,
  HStack,
  Text,
  Box,
  Heading,
  VStack, Stack, Divider, Badge,Flex
} from '@chakra-ui/react';
import { COLORS } from '../colors';

export default function UsersPosts({ post, key }) {
  let date = post.postCreatedAt;
  let newDate = new Date(date);
  let postDate = newDate.toLocaleDateString('en-US');
  let time = newDate.toLocaleTimeString('en-US');

  return (
    <>
    <Box 
        borderWidth="1px" 
        shadow="md" 
        bg={"hsl(0,0%,98%)"}
        position="relative"
        rounded="md"
        borderRadius="5px"
        // maxW='100%'
        w={['350px','450px','600px','775px','900px']}
        // w={['350px','500px','700px','850px','1000px']}
        pb={2}
        
        m={8}
      >         
        <Stack display={'block'} isInline justifyContent="space-between" mt={2} pl={5} pr={5}>
            <Box maxW="100%">      
                
                  <Stack isInline display="flex" justifyContent='space-between 'mb={2}>
                    <HStack spacing={4}>
                        <Flex
                          justifyContent={{
                            base: "center",
                            md: "end",
                          }}
                          mt={[0]}
                          >
                          <Image  w={[10,20]} h={[10,20]} mt={-8} borderRadius="50%" src={post.creatorImageUrl}/>
                        </Flex>
                        <Link to={`/user/${post.creatorId}/profile`}  ><Text fontFamily={"Roboto, sans-serif"} fontWeight={'bold'} color={COLORS.indigo} >@{post.creatorUsername}</Text></ Link>
                      </HStack>
                      <HStack>
                        <Badge borderRadius={"5px"} px='2' style={{"background":"rgba(113, 57, 190, .2)"}} color={"hsl(255, 25%, 50%)"}>{postDate}</Badge>
                        <Badge borderRadius={"5px"} px='2' style={{"background":"rgba(113, 57, 190, .2)"}} color={"hsl(255, 25%, 50%)"}>{time}</Badge>
                      </HStack>
                    </Stack>
                    <Stack>
                        <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.indigo} height="16px" fontSize={['20px','24px','26px','28px']} pb={10} width="100%">{post.postTitle}</Heading>
                        <Divider w={['300px','400px','550px','725px','850px']}/>
                        <Text fontFamily={"Open Sans, sans-serif"} color={COLORS.indigo} p={2} mt={2} minH="14px" width="80%" >{post.postContent}</Text>
                    </Stack>
                </Box>
              </Stack>
              
            </Box>
            </>
  )
}
