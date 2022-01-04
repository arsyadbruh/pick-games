import React from 'react';
import {Box, Center, Text} from 'native-base';
import Header from '../components/Header';


const SearchScreen = () => {
    return (
        <>
            <Header title={"Search"}/>
            <Center flex={1}>
                <Text>Search Screen</Text>
            </Center>
        </>
    )
}

export default SearchScreen;