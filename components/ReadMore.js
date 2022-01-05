import React, {useState} from "react";
import { Text, View } from "native-base";
import { TouchableOpacity } from "react-native";

const ReadMore = ({text}) => {
    const [readMore, setReadMore] = useState(true);
    return (
        <View pr={3}>
            <Text color={"white"} textAlign={"justify"} fontSize={"16px"}>
                {readMore ? text.slice(0,250) : text}
            </Text>
            <TouchableOpacity onPress={() => setReadMore(!readMore)} >
                <Text bg={"#4e5459"} color={"white"} fontWeight={"bold"} borderRadius={"lg"} px={3} width={"80px"} >{readMore ? "read more" : "show less"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReadMore;