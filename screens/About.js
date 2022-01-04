import React from 'react';
import {Box, Center, Text} from 'native-base';
import Header from '../components/Header';


const AboutScreen = () => {
    return (
        <>
            <Header title={"About"}/>
            <Center flex={1}>
                <Text>About Screen</Text>
            </Center>
        </>
    )
}

export default AboutScreen;