import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
      } catch (error) {
        console.log("Error fetching hikes", error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const data = await Database.getHikes();
    setHikes(data);
  };

  const handleDeleteAllHikes = async () => {
    await Database.deleteAllHikes();
    const data = await Database.getHikes();
    setHikes(data);
  }

  const renderHikeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.input}
      onPress={() => navigation.navigate("Detail", { hike: item })}
    >
      <Text>{item.title}</Text>
      {/* <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={() => handleDeleteAllHikes()}
      >
        <Text style={styles.deleteAllButtonText}>Delete All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.addButtonText}>Add Hike</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  hikeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 40,
    alignItems: "center",
    width: "30%",
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteAllButton: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 40,
    marginBottom: 10,
    alignItems: "center",
    alignSelf: "flex-end",
    width: "30%",
  },
  deleteAllButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
    justifyContent: "center",
  },
});

export default HomeScreen;