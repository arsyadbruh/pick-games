import React, {useState, useEffect} from 'react';
import {Box, Center, Text, Image, Spinner, FlatList, AspectRatio, View, Heading} from 'native-base';
import Header from '../components/Header';
import { TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    const fetchListGame = async () => {
        let urlApi = "https://www.freetogame.com/api/games";
        try {
            const response = await fetch(urlApi);
            const listGame = await response.json();
            setGames(listGame);
        } catch (error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const renderListGame = (item) => {
        const game = item.item;
        return (
            <View p={5}>
                <TouchableOpacity onPress={ () => console.log("clicked")} >
                    <Box>
                        <AspectRatio w={"100%"} ratio={16/10}>
                            <Image source={{ uri: game.thumbnail }} alt="Article Thumnail" borderTopRadius={"sm"}/>
                        </AspectRatio>
                        <Box bg={"#32383e"} py={3} px={5} borderBottomRadius={"sm"}>
                            <Heading color={"white"}>{game.title}</Heading>
                        </Box>
                    </Box>
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        fetchListGame();
    }, []);


    return (
        <>
            {console.log("==================== render again ====================")}
            <Header title={"Home"}/>
            {
                isLoading ? (
                    <Center flex={1}>
                        <Spinner size={"lg"} color={"#fe7100"} />
                    </Center>
                ) : (
                    <FlatList data={games} keyExtractor={(item) => item.id} renderItem={renderListGame} bg={"#2a2e33"}/>
                )
            }
        </>
    )
}

export default HomeScreen;