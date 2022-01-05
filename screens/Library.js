import React from 'react';
import {Box, Center, Text} from 'native-base';
import Header from '../components/Header';


const LibraryScreen = () => {
    return (
        <>
            <Header title={"Library"}/>
            <Center flex={1}>
                <Text>Library Screen</Text>
            </Center>
        </>
    )
}

export default LibraryScreen;