import React, { useState, useEffect } from "react";
import { Box, Center, Text, Image, Spinner, FlatList, AspectRatio, View, Heading, HStack } from "native-base";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true); // buat spinner
  const [games, setGames] = useState([]); // nampung daftar game

  const fetchListGame = async () => {
    let urlApi = `https://www.freetogame.com/api/games?sort-by=popularity`;
    try {
      const response = await fetch(urlApi);
      const listGame = await response.json(); // taruh hasil fetch json ke daftar games
      setGames(listGame.slice(0, 10)); // limit 10 game popular
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // matikan spinner
    }
  };


  // component buat di render oleh flatlist
  const renderListGame = (item) => {
    const game = item.item;
    return (
      <View p={5}>
        <TouchableOpacity onPress={() => navigation.navigate("GameDetailScreen", { gameID: game.id })}>
          <Box>
            {/* Image section */}
            <AspectRatio w={"100%"} ratio={16 / 8}>
              <Image source={{ uri: game.thumbnail }} alt="Article Thumnail" borderTopRadius={"xl"} />
            </AspectRatio>

            {/* Text Section */}
            <Box bg={"#32383e"} py={3} px={5} borderBottomRadius={"xl"}>
              <Heading size={"xl"} color={"white"}>
                {game.title}
              </Heading>
              <Text color={"white"} textAlign={"justify"}>
                {game.short_description}
              </Text>

              {/* Badge untuk genre dan platform game */}
              <HStack mt={2}>
                <Text bg={"#7a8288"} color={"#4e5459"} fontWeight={"bold"} p={1} borderRadius={"lg"} mr={2}>
                  {game.genre}
                </Text>
                <Text bg={"#7a8288"} color={"#4e5459"} fontWeight={"bold"} p={1} borderRadius={"lg"}>
                  {game.platform}
                </Text>
              </HStack>
              
            </Box>
          </Box>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    fetchListGame();
  }, []);

  return (
    <>
      <Header title={"Home"} />

      {isLoading ? (
        <Center flex={1} bg={"#2a2e33"}>
          <Spinner size={"lg"} colorScheme={"primary"} />
        </Center>
      ) : (
        <FlatList data={games} keyExtractor={(item) => item.id} renderItem={renderListGame} bg={"#2a2e33"} />
      )}

    </>
  );
};

export default HomeScreen;
