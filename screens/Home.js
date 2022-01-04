import React from 'react';
import {Box, Center, Text} from 'native-base';
import Header from '../components/Header';

const HomeScreen = () => {
    return (
        <>
            <Header title={"Home"}/>
            <Center flex={1}>
                <Text>Home Screen</Text>
            </Center>
        </>
    )
}

export default HomeScreen;