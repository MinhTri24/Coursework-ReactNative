import React, { useState, useMemo } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Database from "../Database";
import { RadioGroup } from "react-native-radio-buttons-group";
import SelectDropdown from 'react-native-select-dropdown';
import { isValid, parse } from 'date-fns';

const AddScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");

  function isTimeValid(inputTime) {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-9]):[0-5][0-9]$/;

    if (timeRegex.test(inputTime)) {
      return true; // Valid time
    } else {
      return false; // Invalid time
    }
  }

  function isDateValid(inputDate) {
    const parsedDate = parse(inputDate, 'd/M/yyyy', new Date());
  
    if (isValid(parsedDate)) {
      return true; // Valid date
    } else {
      return false; // Invalid date
    }
  }

  const radioButtons = useMemo(() => ([
    {
        id: '1',
        label: 'Yes',
        value: 'yes'
    },
    {
        id: '2',
        label: 'No',
        value: 'no'
    }
  ]), []);

  const [parking, setParking] = useState("");

  if(!parking) {
    setParking('1')
  }

  parkingAvailable = "";

  const [length, setLength] = useState("");

  const levels = ["HIGH", "MEDIUM", "LOW"];

  const [difficulty, setDifficulty] = useState("");

  const onSelect = (index, value) => {
    setDifficulty(value);
  };

  const [description, setDescription] = useState("");

  const handleAddHike = async () => {
    if (!title || !location || !date || !parking || !length || !difficulty) {
      Alert.alert("Error", "Please fully fill the form.");
      return;
    } else if (!isDateValid(date)) {
      Alert.alert("Error", "Please enter a valid date.");
      return;
    } else if (!isTimeValid(time)) {
      Alert.alert("Error", "Please enter a valid time.");
      return;
    }

    if(parking == "1"){
        parkingAvailable = "Yes"
    } else {
        parkingAvailable = "No"
    }

    await Database.addHike(title, location, date, parkingAvailable, length, time, participants, difficulty, description);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name of the hike*</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Son Dong"
      />
      <Text style={styles.label}>Location *</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Quang Binh"
        multiline
      />
      <Text style={styles.label}>Date of the hike *</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="2023-01-01"
        multiline
      />
      <Text style={styles.label}>Parking Available *</Text>
      <RadioGroup 
            radioButtons={radioButtons} 
            layout="row"
            onPress={setParking}
            selectedId={parking}
        />
      <Text style={styles.label}>Length of the hike(km) *</Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        placeholder="100"
        inputMode="numeric"
        multiline
      />
      <Text style={styles.label}>Hike Duration (HH:mm):</Text>
      <TextInput
        style={[styles.input]}
        placeholder="10:37"
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>Participants of the hike</Text>
      <TextInput
        style={styles.input}
        value={participants}
        onChangeText={setParticipants}
        placeholder="100"
        inputMode="numeric"
        multiline
      />
      <Text style={styles.label}>Difficult level *</Text>
      <SelectDropdown
        buttonStyle={styles.input}
        data={levels}
        onSelect={(selectedItem, index) => onSelect(index, selectedItem)}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        height={40}
        padding={10}
        textAlignVertical="top"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddHike}>
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
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddScreen;