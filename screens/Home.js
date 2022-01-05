import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Text,
  Image,
  Spinner,
  FlatList,
  AspectRatio,
  View,
  Heading,
  HStack,
} from "native-base";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState("release-date");

  const fetchListGame = async (sorting = "release-date") => {
    let urlApi = `https://www.freetogame.com/api/games?sort-by=${sorting}`;
    try {
      const response = await fetch(urlApi);
      const listGame = await response.json();
      setGames(listGame);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const renderListGame = (item) => {
    const game = item.item;
    return (
      <View p={5}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GameDetailScreen", {
              gameID: game.id,
            })
          }>
          <Box>
            <AspectRatio w={"100%"} ratio={16 / 8}>
              <Image
                source={{ uri: game.thumbnail }}
                alt="Article Thumnail"
                borderTopRadius={"xl"}
              />
            </AspectRatio>
            <Box bg={"#32383e"} py={3} px={5} borderBottomRadius={"xl"}>
              <Heading size={"xl"} color={"white"}>
                {game.title}
              </Heading>
              <Text color={"white"} textAlign={"justify"}>
                {game.short_description}
              </Text>
              <HStack mt={2}>
                <Text
                  bg={"#7a8288"}
                  color={"#4e5459"}
                  fontWeight={"bold"}
                  p={1}
                  borderRadius={"lg"}
                  mr={2}>
                  {game.genre}
                </Text>
                <Text
                  bg={"#7a8288"}
                  color={"#4e5459"}
                  fontWeight={"bold"}
                  p={1}
                  borderRadius={"lg"}>
                  {game.platform}
                </Text>
              </HStack>
            </Box>
          </Box>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSort = (sorting) => {
    if (sorting === "release-date") {
      setSortBy("release-date");
    } else if (sorting === "popularity") {
      setSortBy("popularity");
    } else if (sorting === "alphabetical") {
      setSortBy("alphabetical");
    }
    setLoading(true);
    fetchListGame(sorting);
  };

  //   const refreshList = () => {
  //       setFetching(true);
  //       fetchListGame();
  //   }

  useEffect(() => {
    fetchListGame();
  }, []);

  return (
    <>
      {console.log("==================== render again ====================")}
      <Header title={"Home"} />
      <Box bg={"#2a2e33"} p={5}>
        <HStack space={5}>
          <Text color={"white"} fontWeight={"bold"} fontSize={"16px"}>
            Sort By
          </Text>
          <TouchableOpacity onPress={() => handleSort("release-date")}>
            <Text
              bg={sortBy === "release-date" ? "white" : "#2a2e33"}
              color={sortBy === "release-date" ? "#2a2e33" : "white"}
              fontSize={"16px"}
              px={3}
              borderRadius={"md"}>
              Date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort("popularity")}>
            <Text
              bg={sortBy === "popularity" ? "white" : "#2a2e33"}
              color={sortBy === "popularity" ? "#2a2e33" : "white"}
              fontSize={"16px"}
              px={3}
              borderRadius={"md"}>
              Popularity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort("alphabetical")}>
            <Text
              bg={sortBy === "alphabetical" ? "white" : "#2a2e33"}
              color={sortBy === "alphabetical" ? "#2a2e33" : "white"}
              fontSize={"16px"}
              px={3}
              borderRadius={"md"}>
              A - Z
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>
      {isLoading ? (
        <Center flex={1} bg={"#2a2e33"}>
          <Spinner size={"lg"} color={"#fe7100"} />
        </Center>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={renderListGame}
          bg={"#2a2e33"}
        />
      )}
    </>
  );
};

export default HomeScreen;
