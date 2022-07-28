import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuthContext } from '../../contexts/auth';
import { Container, Button, FormLabel, Checkbox, 
  CheckboxGroup, Text, Box, Stack, VStack, Heading, Flex
} from '@chakra-ui/react';

export default function EventRegistration({ event, games }) {

  const { user } = useAuthContext()

  const { eventId } = useParams()

  const [checkedItems, setCheckedItems] = useState([])
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    
    const setItems = async() => {
      if(games.game) {
        setCheckedItems(new Array(games.game.length).fill(false))
      }
    }
    setItems()
    
  }, [games.game]);

  function replaceAt(array, index, value) {
    const newArray = array.slice(0)
    newArray[index] = value
    return newArray
  }

  function getGamesRegistered(gameArray) {
    let registeredArray = []
    for(let i = 0; i < gameArray.length; i++) {
      if(gameArray[i]) {
        registeredArray.push(games.game[i].id)
      }   
    }

    return registeredArray
  }


  const handleOnSubmit = async () => {
    setErrors(error => ({...error, form: null}))
    const { data, error } = await apiClient.registerForEvent({
      eventId: eventId,
      eventGame: getGamesRegistered(checkedItems),
    })
    if(error) setErrors((e) => ({ ...e, form: error}))
  }

  return (
    <Container centerContent>
      <FormLabel htmlFor="eventGame">
        <Heading>Event Registration</Heading>
      </FormLabel>
      <Box>
          
              <Stack spacing={4}>
                  <CheckboxGroup size="lg">
                      {games.game?.map((game, index) => (
                        <Checkbox colorScheme='purple' mt={2} key={game.id} value={game.name}  isChecked={checkedItems[index]} 
                        onChange={e => setCheckedItems(replaceAt(checkedItems, index, e.target.checked))}>
                        {game.name}
                        </Checkbox>
                      ))}
                  </CheckboxGroup>
              <Button colorScheme="purple" onClick={handleOnSubmit}>Register</Button></Stack>
          
      </Box>
      <Box position={"relative"} paddingLeft={"20px"}>
          
      </Box>
    </Container>
  );
}
