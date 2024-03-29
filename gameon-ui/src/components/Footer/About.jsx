import * as React from "react"
import {Box, Heading, Container, Image, Text, Stack} from "@chakra-ui/react"
import { COLORS } from "../colors"
import pic from "../../contexts/media/Logo-fixed.png"
// import { Link } from "react-router-dom"

export default function About(){
    return (
        <Box width={"100%"} height={"auto"} background={"hsla(255, 50%, 21%, 0.8)"} paddingBottom={4} borderTopRadius={"20px"}>

        <Container minWidth={"80%"}>
        <Heading letterSpacing={3} textTransform={"uppercase"} fontFamily={"VT323, monospace"} textAlign={"center"} marginY={4} paddingY={2} color={COLORS.offWhite}>A gaming hub created for all gamers.</Heading>
        <Image float={"left"} width={"200px"} marginRight={"16px"} marginTop={-12} objectFit={"cover"} src={pic}/>
        <Box marginX={"20px"} overflow={"hidden"}>
        <Text marginLeft={3} paddingBottom={2} whiteSpace={"pre-line"} fontFamily={"Open Sans, sans-serif"} fontSize={"xl"} color={COLORS.offWhite}>
        GameOn! is a community hub for all gamers looking to attend events. 
        Our mission is to have gamers of all ages and different backgrounds to attend these events. 
        Not only do we want gamers, but also event coordinators. 
        Our site allows users to create and host their own events whether competitive or casual. 
        We grew up playing video games and noticed how playing with other people can bring us together. 
        Whether playing with our younger siblings, or someone we just met at a convention. 
        We hope to encourage all gamers to have that same experience with our site.
        </Text>

        </Box>
        </Container>
       </Box>

    )
}