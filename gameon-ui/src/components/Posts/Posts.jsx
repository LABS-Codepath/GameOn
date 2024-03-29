import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient'
import { Link } from "react-router-dom"
import {
  Textarea, Image, Container, Button,
  HStack, Text, Box, Heading, VStack, 
  Modal, ModalOverlay, ModalFooter, 
  ModalBody, ModalContent, ModalHeader, 
  ModalCloseButton, useDisclosure, ButtonGroup, 
  Stack, Skeleton, Divider, Badge, Flex,
  FormControl, FormErrorMessage
} from '@chakra-ui/react';
import PostReply from './PostReply';
import { COLORS } from "../colors.js"

// Located in EventPage file

export default function Posts({ post, eventId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postReplies, setPostReplies] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isSubmit,setIsSubmit]=useState()
  const [createReplyForm, setCreateReplyForm] = useState({
    replyContent: '',
  });

  let date = post.postCreatedAt;
  let newDate = new Date(date);
  let postDate = newDate.toLocaleDateString('en-US');
  let time = newDate.toLocaleTimeString('en-US');

  useEffect(() => {
    const fetchPostReplies = async () => {
      const { data, error } = await apiClient.listAllRepliesByEventId(
        eventId,
        post.postId
      );
      if (data) {
        setPostReplies(data.replies);
      }
      if (error) setErrors(error);
    };
    fetchPostReplies();
  }, []);

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));

    const { data, error } = await apiClient.createPostReply({
      eventId: eventId,
      postId: post.postId,
      replyContent: createReplyForm.replyContent,
    });
    if (error) setErrors(e => ({ ...e, form: error }));
    setIsSubmit(true)
    
    if(createReplyForm.replyContent.length>0){
      onClose()
      // window.location.reload();
      window.location = document.URL;
    }
    
  };

  const handleOnInputChange = event => {
    setCreateReplyForm(createReplyForm => ({
      ...createReplyForm,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container centerContent>
      <Box 
        borderWidth="1px" 
        shadow="md" 
        background={"hsl(0,0%,98%)"}
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
                          mt={[-16]}>
                          <Image w={[10,20]} h={[10,20]} mt={8} borderRadius="50%" src={post.creatorImageUrl}/>
                        </Flex>
                        <Link to={`/user/${post.creatorId}/profile`}><Text fontFamily={"mono, sans-serif"} fontWeight={'bold'} >@{post.creatorUsername}</Text></ Link>
                      </HStack>
                      <HStack>
                        <Badge borderRadius={"5px"} px='2' style={{"background":"rgba(113, 57, 190, .2)"}} color={"hsl(255, 25%, 50%)"}>{postDate}</Badge>
                        <Badge borderRadius={"5px"} px='2' style={{"background":"rgba(113, 57, 190, .2)"}} color={"hsl(255, 25%, 50%)"}>{time}</Badge>
                      </HStack>
                    </Stack>
                    <Stack>
                        <Heading fontFamily={"Roboto, sans-serif"} height="16px" fontSize={['18px','20px','22px','24px']} pb={10} width="100%">{post.postTitle}</Heading>
                        <Divider w={['300px','400px','550px','725px','850px']}/>
                        <Text fontFamily={"mono, sans-serif"} whiteSpace= "pre-wrap" p={2} mt={2} minH="14px" width="80%" >{post.postContent}</Text>
                    </Stack>
                </Box>
              </Stack>
              
            </Box>
       {postReplies?.map((postReply, index) => (
          <PostReply key={index} postReply={postReply} eventId={eventId} />
        ))}
        <Box w={['150px','300px','450px','600px','750px']} mb={2} >
              <Button fontFamily={"mono, sans-serif"} color={COLORS.indigo} onClick={onOpen}>Reply</Button></Box>
        <Divider w={['150px','300px','450px','600px','750px']} />
        <VStack>    
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent maxWidth={'100rem'} width={'90%'} maxHeight={'75%'} overflowY={'auto'}
                                      css={{
                                        '&::-webkit-scrollbar': {
                                          width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                          width: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#805AD5',
                                          borderRadius: '24px',
                                        },}}>
            <ModalHeader>Reply</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl variant="floating" isInvalid={!createReplyForm.replyContent.length>0&&isSubmit?true:false}>
                <Textarea name="replyContent" defaultValue={createReplyForm.replyContent} onChange={handleOnInputChange} />
                {!createReplyForm.replyContent.length>0&&isSubmit?<FormErrorMessage>Reply is required.</FormErrorMessage>:null}
              </FormControl>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup margin={2} >
                    <Button onClick={handleOnSubmit}>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ButtonGroup>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
}
