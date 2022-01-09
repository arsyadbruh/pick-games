import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Box,
  Center,
  Text,
  Button,
  Flex,
  Modal,
  Spinner,
  FlatList,
  HStack,
  View,
  Heading,
  Image,
  AspectRatio,
  Icon,
} from "native-base";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LibraryScreen = ({ navigation }) => {
  const category = [
    "mmorpg",
    "shooter",
    "strategy",
    "moba",
    "racing",
    "sports",
    "social",
    "sandbox",
    "open-world",
    "survival",
    "pvp",
    "pve",
    "pixel",
    "voxel",
    "zombie",
    "turn-based",
    "first-person",
    "third-Person",
    "top-down",
    "tank",
    "space",
    "sailing",
    "side-scroller",
    "superhero",
    "permadeath",
    "card",
    "battle-royale",
    "mmo",
    "mmofps",
    "mmotps",
    "3d",
    "2d",
    "anime",
    "fantasy",
    "sci-fi",
    "fighting",
    "action-rpg",
    "action",
    "military",
    "martial-arts",
    "flight",
    "low-spec",
    "tower-defense",
    "horror",
    "mmorts",
  ];

  const [isLoading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState("release-date");
  const [platform, setPlatform] = useState("pc");
  const [groupValues, setGroupValues] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch seluruh game dengan sorting dan filter hanya platform
  const fetchListGameNoFilter = async (sorting = "release-date", platformGames = "pc") => {
    let urlApi = `https://www.freetogame.com/api/games?sort-by=${sorting}&platform=${platformGames}`;
    try {
      const response = await fetch(urlApi);
      const listGame = await response.json();
      setGames(listGame);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch game dengan adanya multiple filter berdasarkan tags
  const fetchListGameFilter = async (sorting = "release-date", platformGames = "pc") => {
    const tags = groupValues.join(".");
    let urlApi = `https://www.freetogame.com/api/filter?tag=${tags}&platform=${platformGames}&sort-by=${sorting}`;
    try {
      const response = await fetch(urlApi);
      const listGame = await response.json();
      setGames(listGame);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderListGame = (item) => {
    const game = item.item;
    return (
      <View p={5} key={game.id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GameDetailScreen", {
              gameID: game.id,
            })
          }>
          <Box>
            <AspectRatio w={"100%"} ratio={16 / 8}>
              <Image source={{ uri: game.thumbnail }} alt="Article Thumnail" borderTopRadius={"xl"} />
            </AspectRatio>
            <Box bg={"#32383e"} py={3} px={5} borderBottomRadius={"xl"}>
              <Heading size={"xl"} color={"white"}>
                {game.title}
              </Heading>
              <Text color={"white"} textAlign={"justify"}>
                {game.short_description}
              </Text>
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

  // hanle event untuk sorting list game
  const handleSort = (sorting) => {
    if (sorting === "release-date") {
      setSortBy("release-date");
    } else if (sorting === "popularity") {
      setSortBy("popularity");
    } else if (sorting === "alphabetical") {
      setSortBy("alphabetical");
    }
    setLoading(true);
    // cek apakah ada tags yang tercentang
    groupValues.length === 0 ? fetchListGameNoFilter(sorting, platform) : fetchListGameFilter(sorting, platform);
  };

  // handle event untuk filter platform
  const handlePlatform = (platformGames) => {
    platformGames === "pc" ? setPlatform("pc") : setPlatform("browser");

    setLoading(true);
    groupValues.length === 0
      ? fetchListGameNoFilter(sortBy, platformGames)
      : fetchListGameFilter(sortBy, platformGames);
  };

  // handle event untuk filter by tags
  const handleFilter = () => {
    setLoading(true);
    groupValues.length === 0 ? fetchListGameNoFilter(sortBy, platform) : fetchListGameFilter(sortBy, platform);
    setShowModal(false);
  };

  useEffect(() => {
    fetchListGameNoFilter();
  }, []);

  return (
    <>
      <Header title={"Library"} />

      {/* Sorting section */}
      <Box bg={"#2a2e33"} px={5} pt={7} pb={3}>
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

      {/* Platform */}
      <Box bg={"#2a2e33"} px={5}>
        <HStack space={5}>
          <Text color={"white"} fontWeight={"bold"} fontSize={"16px"}>
            Platform
          </Text>
          <TouchableOpacity onPress={() => handlePlatform("pc")}>
            <Text
              bg={platform === "pc" ? "white" : "#2a2e33"}
              color={platform === "pc" ? "#2a2e33" : "white"}
              fontSize={"16px"}
              px={3}
              borderRadius={"md"}>
              PC (Windows)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlatform("browser")}>
            <Text
              bg={platform === "browser" ? "white" : "#2a2e33"}
              color={platform === "browser" ? "#2a2e33" : "white"}
              fontSize={"16px"}
              px={3}
              borderRadius={"md"}>
              Browser
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>

      {/* Filter button section */}
      <Box bg={"#2a2e33"} px={3} pb={5} pt={3}>
        <Button
          onPress={() => setShowModal(true)}
          size={"sm"}
          leftIcon={<Icon as={AntDesign} name="filter" size="sm" />}>
          <Text color={"white"}>Category ( {groupValues.length} )</Text>
        </Button>
        <Modal isOpen={showModal} onClose={() => handleFilter()}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              <Heading>Category</Heading>
            </Modal.Header>
            <Modal.Body>
              <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose Category">
                <Flex flexDirection={"row"} flexWrap={"wrap"}>
                  {category.map((item, index) => (
                    <Box width={"50%"} key={index}>
                      <Checkbox value={item} my={2} mx={2}>
                        <Text ml={2}>{item}</Text>
                      </Checkbox>
                    </Box>
                  ))}
                </Flex>
              </Checkbox.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    setGroupValues([]);
                  }}>
                  Clear
                </Button>
                <Button
                  onPress={() => {
                    handleFilter();
                  }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>

      {isLoading ? (
        <Center flex={1} bg={"#2a2e33"}>
          <Spinner size={"lg"} colorScheme={"primary"} />
        </Center>
      ) : games.status != undefined ? (
        <Center flex={1} bg={"#2a2e33"}>
          <Text color={"white"}>No game in list</Text>
        </Center>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderListGame}
          bg={"#2a2e33"}
          key={games.forEach((item) => {
            item.id;
          })}
        />
      )}
    </>
  );
};

export default LibraryScreen;
