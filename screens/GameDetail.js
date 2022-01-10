import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  Box,
  Text,
  Center,
  ScrollView,
  Heading,
  AspectRatio,
  Image,
  Spinner,
  HStack,
  VStack,
  Button,
} from "native-base";
import { Linking, Share } from "react-native";
import ReadMore from "../components/ReadMore";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const GameDetailScreen = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [detailGame, setDetailGame] = useState([]);

  const fetchDetailGame = async () => {
    const GAME_ID = route.params.gameID;
    let urlApi = `https://www.freetogame.com/api/game?id=${GAME_ID}`;
    try {
      const response = await fetch(urlApi);
      const detailData = await response.json();
      setDetailGame(detailData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailGame();
  }, []);

  // buat open link di browser
  const handleOpenLink = (link) => {
    Linking.openURL(link);
  };

  // function untuk tombol share
  const onShare = async (message) => {
    try {
      await Share.share({
        message: `Lets play this game together \n ${message}`,
        url: message,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header title={"Game Detail"} withBackBtn={true} />

      {isLoading ? (
        <Center flex={1} bg={"#272b30"}>
          <Spinner size={"lg"} colorScheme={"primary"} />
        </Center>
      ) : (
        <ScrollView bg={"#272b30"}>
          <Box mb={10}>
            {/* Judul dan Gambar */}
            <Box>
              <Heading color={"white"} size={"2xl"} my={3} ml={3}>
                {detailGame.title}
              </Heading>
            </Box>
            <AspectRatio w={"100%"} ratio={16 / 9}>
              <Image source={{ uri: detailGame.thumbnail }} alt="Thumbnail Game" />
            </AspectRatio>

            {/* Button action */}
            <Box my={3} p={3}>
              <HStack justifyContent={"space-between"} space={3} pr={3}>
                <Button onPress={() => handleOpenLink(detailGame.freetogame_profile_url)} width={"50%"}>
                  <HStack>
                    <FontAwesome5 name="external-link-alt" size={19} color="white" />
                  <Text color={"white"} fontSize={"16px"} ml={2} >Open in Browser</Text>
                  </HStack>
                </Button>
                <Button onPress={() => onShare(detailGame.freetogame_profile_url)} width={"50%"}>
                  <HStack>
                    <Ionicons name="share-social" size={22} color="white"/>
                    <Text color={"white"} fontSize={"16px"} ml={2} >Share Games</Text>
                  </HStack>
                </Button>
              </HStack>
            </Box>

            {/* Screenshot section */}
            <Box py={3}>
              <Heading color={"white"} mb={2} ml={3}>
                ScreenShot
              </Heading>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {detailGame.screenshots.map((item) => (
                  <AspectRatio width={300} ratio={16 / 9} key={item.id}>
                    <Image source={{ uri: item.image }} alt="Thumbnail Game" />
                  </AspectRatio>
                ))}
              </ScrollView>
            </Box>

            {/* Minimum requirements section
             * karena beberapa game terutama platform browser tidak ada
             * system requirements maka di gunakan hasOwnProperty() untuk
             * cek apakah game ada property minimum_system_requirements
             */}
            {detailGame.hasOwnProperty("minimum_system_requirements") ? (
              <Box ml={3} my={5}>
                <Heading color={"white"} my={2}>
                  System Requirements
                </Heading>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Operating System
                </Text>
                <Text color={"white"} fontSize={"18px"} mb={3}>
                  {detailGame.minimum_system_requirements.os}
                </Text>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Processor
                </Text>
                <Text color={"white"} fontSize={"18px"} mb={3}>
                  {detailGame.minimum_system_requirements.processor}
                </Text>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Memory
                </Text>
                <Text color={"white"} fontSize={"18px"} mb={3}>
                  {detailGame.minimum_system_requirements.memory}
                </Text>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Graphics
                </Text>
                <Text color={"white"} fontSize={"18px"} mb={3}>
                  {detailGame.minimum_system_requirements.graphics}
                </Text>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Storage
                </Text>
                <Text color={"white"} fontSize={"18px"}>
                  {detailGame.minimum_system_requirements.storage}
                </Text>
              </Box>
            ) : (
              // jika tidak ada menampilkan <Box> kosong
              <Box></Box>
            )}

            {/* About Game section */}
            <Box my={3} ml={3}>
              <Heading color="white" mb={3}>
                About {detailGame.title}
              </Heading>
              {/* mengambil component ReadMore untuk menyingkat description  */}
              <ReadMore text={detailGame.description} />
            </Box>

            {/* Info game */}
            <Box my={3} ml={3}>
              <Heading color={"white"} mb={3}>
                Additional Information
              </Heading>
              <VStack space={5}>
                <HStack>
                  <Box width={"50%"}>
                    <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                      Publisher
                    </Text>
                    <Text color={"white"}>{detailGame.publisher}</Text>
                  </Box>
                  <Box width={"50%"}>
                    <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                      Developer
                    </Text>
                    <Text color={"white"}>{detailGame.developer}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width={"50%"}>
                    <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                      Release Date
                    </Text>
                    <Text color={"white"}>{detailGame.release_date}</Text>
                  </Box>
                  <Box width={"50%"}>
                    <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                      Platform
                    </Text>
                    <Text color={"white"}>{detailGame.platform}</Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export default GameDetailScreen;
