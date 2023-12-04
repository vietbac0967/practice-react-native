import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Pressable } from "react-native";

export default function LoginScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("https://653f4b7b9e8bd3be29e02fc1.mockapi.io/dictionary")
      .then((reps) => reps.json())
      .then((json) => setUsers(json))
      .catch((err) => console.log(err));
  }, []);

  console.log(users);

  const validateUser = () => {
    users.forEach((x) => {
      if (x.username === username && x.password === password) {
        navigation.navigate("Home", { id: x.id });
      } else {
        return;
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View>
        <TextInput
          placeholder="Enter username"
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
        ></TextInput>

        <TextInput
          placeholder="Enter password"
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        ></TextInput>

        <Pressable
          onPress={() => validateUser()}
          style={{ width: "100%", padding: 10, backgroundColor: "green" }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: 600 }}
          >
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
});
