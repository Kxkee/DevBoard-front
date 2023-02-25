import { Flex, Box, Text, Image, Divider, Card, Input, Button } from "@chakra-ui/react";
import Firstname from "./Firstname/Firstname";
import Lastname from "./Lastname/Lastname";
import img from "../../assets/profile.png";
import Username from "./Username/Username";
import Github from "./Github/Github";
import Email from "./Email/Email";
import { useDispatch, useSelector } from "react-redux";
import { modifyUser } from "../../features/user/user";
import Notification from "../Notification/Notification";
import { useState } from "react";

function Profile() {

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.login);
    const { status } = useSelector((state) => state.login);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(isLoading) return;
        setIsLoading(true);
        dispatch(modifyUser({ user }));
        setTimeout(() => {
            setIsLoading(false);
            setNotification(true);
            setTimeout(() => {
              setNotification(false);
            }, 100); // Masquer la notification après 3 secondes
          }, 500);
    } 

    return(
        <Flex w="98%" mt="10" h="80%">
        <Box w="100%" display="flex" bgColor="white" borderRadius="md" boxShadow="md">
            <Box w="20%" pr="10">
                <Box display="flex" flexDirection="column" alignItems="flex-start" p="10">
                    <Image
                        maxW="200px"
                        src={img}
                        borderRadius="md"
                        mb="10"
                        />
                    
                </Box>
            </Box>
            
            <Box w="50%" display="flex">
                <Box w="100%" display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-start" height="100%">
                    <Box display="flex" justifyContent="space-around" alignItems="flex-start" w="100%">
                        <Box>
                            <Username />
                            <Email />
                            <Github />
                            </Box>

                            <Box>
                            <Firstname />
                            <Lastname />
                        </Box>
                    </Box>
                        <Box w="100%" display="flex" justifyContent="center">
                        <Box w="80%">
                            <Button mt="10" w="100%" colorScheme='linkedin' onClick={handleSubmit} isLoading={isLoading}>Submit</Button>
                        </Box>
                        </Box>
                            
                </Box>
            </Box>
            </Box>
            {notification && <Notification title="Saved !" description="Your changes have been saved" status="success" />}
        </Flex>
    )
}

export default Profile;
