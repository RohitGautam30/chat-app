import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePath from "@/src/constants/images";
import { useNavigation } from "@react-navigation/native";



const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "hi, my name is Rohan", sender: "me", time: "8:32 AM" },
    { id: "2", text: "what is your name?", sender: "bot", time: "8:33 AM" },
    { id: "3", text: "9:30 seh masti", sender: "bot", time: "8:34 AM" },
    { id: "4", text: "what is for dinner?", sender: "me", time: "8:35 AM" },
    { id: "5", text: "9:30 seh masti", sender: "bot", time: "8:36 AM" },
  ]);
  const navigation = useNavigation<any>();
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.header}>
  <TouchableOpacity
    style={styles.headerLeft}
    onPress={() => navigation.navigate("profile")} // 👈 navigate to Profile screen
  >
    <Image source={imagePath.Girl} style={styles.avatar} />
    <View>
      <Text style={styles.headerTitle}>Miya</Text>
      <Text style={styles.headerSub}>Messages and calls are private</Text>
    </View>
  </TouchableOpacity>

  {/* Right Icons */}
  <View style={styles.headerRight}>
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate("call")}
    >
      <Ionicons name="call-outline" size={22} color="green" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Ionicons name="ellipsis-vertical" size={22} color="#ccc" />
    </TouchableOpacity>
  </View>
</View>

      {/* Chat Section */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatArea}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "#222",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerRight: {
  flexDirection: "row",
  alignItems: "center",
},

  headerSub: {
    color: "#888",
    fontSize: 11,
  },
  chatArea: {
    padding: 12,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
  },
  myMessage: {
    backgroundColor: "#1E1E1E",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  botMessage: {
    backgroundColor: "#232323",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#fff",
    fontSize: 14,
  },
  timeText: {
    color: "#999",
    fontSize: 10,
    marginTop: 3,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#1C1C1C",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#2E2E2E",
    borderRadius: 20,
    padding: 10,
  },
});
