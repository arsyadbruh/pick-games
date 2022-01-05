import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { Box, Text, Center, ScrollView, Heading, AspectRatio, Image, Spinner, HStack, Divider } from "native-base";
import ReadMore from "../components/ReadMore";

const GameDetailScreen = ({route}) => {
    const [isLoading, setLoading] = useState(true);
    const [detailGame, setDetailGame] = useState([]);

    const fetchDetailGame = async () => {
        const GAME_ID = route.params.gameID
        let urlApi = `https://www.freetogame.com/api/game?id=${GAME_ID}`;
        try{
            const response = await fetch(urlApi);
            const detailData = await response.json();
            setDetailGame(detailData);
        }catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDetailGame();
    }, []);


    return (
        <>
            <Header title={"Game Detail"} withBackBtn={true}/>
            {
                isLoading ? (
                    <Center flex={1} bg={"#272b30"}>
                        <Spinner size={"lg"} color={"#fe7100"} />
                    </Center>
                ) : (
                    <ScrollView bg={"#272b30"}>

                        <Box mb={5}>
                            <Box>
                                <Heading color={"white"} size={"2xl"} my={3} ml={3}>{detailGame.title}</Heading>
                                
                            </Box>
                            <AspectRatio w={"100%"} ratio={16/9}>
                                <Image source={ {uri: detailGame.thumbnail} } alt="Thumbnail Game"/>
                            </AspectRatio>
                            <Text color={"white"}>{detailGame.short_description}</Text>
                            <Box py={3}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {
                                            detailGame.screenshots.map((item) => (
                                                    <AspectRatio width={300} ratio={16/9} key={item.id}>
                                                        <Image source={ {uri: item.image} } alt="Thumbnail Game" />
                                                    </AspectRatio>
                                            ))
                                        }
                                </ScrollView>
                            </Box>
                            {/*  */}
                            <ReadMore text={detailGame.description}/>
                            <Divider mt={5}/>
                            <Heading color={"white"}>Additional Information</Heading>
                        </Box>
                    </ScrollView>
                    
                )
            }
        </>
    )
}

export default GameDetailScreen;