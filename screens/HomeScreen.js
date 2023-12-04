import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateToAPI } from "../services/dictionary.service";

export default function HomeScreen({ navigation, route }) {
  const { id } = route.params;
  console.log(id);
  const dispatch = useDispatch();
  const { dictionary, newEnglish, newVietnamese } = useSelector(
    (state) => state
  );
  const [vietnamWork, setVietNamWork] = useState("");
  const [englishWork, setEnglishWord] = useState("");
  console.log(dictionary);
  useEffect(() => {
    fetchData(id).then((data) => {
      console.log(data);
      dispatch({ type: "setData", payload: data });
    });
  }, []);
  const english = dictionary.english;
  const vietnamese = dictionary.vietnamese;
  console.log(english, vietnamese);

  const addHandler = () => {
    dispatch({
      type: "add-english",
      payload: {
        id: english.length + 1,
        word: englishWork,
      },
    });
    dispatch({
      type: "add-vietnamese",
      payload: {
        id: vietnamese.length + 1,
        word: vietnamWork,
      },
    });
    setVietNamWork("");
    setEnglishWord("");
  };

  const updateAPI = async () => {
    try {
      await updateToAPI(dictionary, id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Enter English"
        style={styles.textInput}
        value={englishWork}
        onChangeText={setEnglishWord}
      ></TextInput>
      <TextInput
        placeholder="Enter Vietnamese"
        style={styles.textInput}
        value={vietnamWork}
        onChangeText={setVietNamWork}
      ></TextInput>

      <Pressable
        onPress={() => addHandler()}
        style={{ width: "100%", backgroundColor: "pink", padding: 10 }}
      >
        <Text style={{ textAlign: "center", fontWeight: 600, color: "white" }}>
          SUBMIT
        </Text>
      </Pressable>

      <View style={{ flexDirection: "row" }}>
        {english.map((el, idx) => {
          const { word } = el;
          return (
            <View key={idx}>
              <Text style={[styles.text, { color: "red" }]}>
                English: {word}
              </Text>
            </View>
          );
        })}
        {vietnamese.map((el, idx) => {
          const { word } = el;
          return (
            <View key={idx}>
              <Text style={[styles.text, { color: "green" }]}>
                Vietnamese: {word}
              </Text>
            </View>
          );
        })}
      </View>
      <Pressable
        onPress={updateAPI}
        style={{ width: "100%", backgroundColor: "red", marginVertical: 10 }}
      >
        <Text style={{ textAlign: "center", color: "black", fontWeight: 600 }}>
          UPDATE API
        </Text>
      </Pressable>
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
  text: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
});
