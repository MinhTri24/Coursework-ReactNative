import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import SelectDropdown from 'react-native-select-dropdown';
import Database from "../Database";
import { isValid, parse } from 'date-fns';

const DetailScreen = ({ route, navigation }) => {
  const { hike } = route.params;

  hikeId = hike.id;

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
 

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
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'yes',
    },
    {
        id: '2',
        label: 'No',
        value: 'no'
    }
  ]), []);

  const defaultParking = useMemo(() => radioButtons.find(e => e.value === hike.parking), []);

  const [parking, setParking] = useState("");

  if(!parking) {
    setParking('1')
  }

  parkingAvailable = "";

  const [length, setLength] = useState("");
  const [participants, setParticipants] = useState("");

  const levels = ["HIGH", "MEDIUM", "LOW"];

  const [difficulty, setDifficulty] = useState("");

  const onSelect = (index, value) => {
    setDifficulty(value);
  };

  const [description, setDescription] = useState("");

  const handleUpdateHike = async () => {
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

    await Database.updateHike(hikeId, title, location, date, parkingAvailable, time, participants, length, difficulty, description);

    navigation.goBack();
  };

  const handleDeleteHike = async () => {
    await Database.deleteHike(hikeId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name of the hike*</Text>
      <TextInput
        style={styles.input}
        value={title}
        placeholder={hike.title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Location *</Text>
      <TextInput
        style={styles.input}
        value={location}
        placeholder={hike.location}
        onChangeText={setLocation}
        multiline
      />
      <Text style={styles.label}>Date of the hike *</Text>
      <TextInput
        style={styles.input}
        placeholder={hike.date}
        value={date}
        onChangeText={setDate}
        multiline
      />
      <Text style={styles.label}>Parking Available * ({hike.parking})</Text>
      <RadioGroup 
          radioButtons={radioButtons} 
          layout="row"
          onPress={setParking}
          selectedId={parking}
          testID={defaultParking}
      />
      <Text style={styles.label}>Length of the hike (km)*</Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        placeholder={hike.length}
        inputMode="numeric"
        multiline
      />
      <Text style={styles.label}>Hike Duration (HH:mm):</Text>
      <TextInput
        style={[styles.input]}
        placeholder={hike.time}
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>Participants of the hike</Text>
      <TextInput
        style={styles.input}
        value={participants}
        onChangeText={setParticipants}
        placeholder={hike.participants}
        inputMode="numeric"
        multiline
      />
      <Text style={styles.label}>Difficult level *</Text>
      <SelectDropdown
        buttonStyle={styles.input}
        data={levels}
        defaultValue={hike.difficulty}
        onSelect={(selectedItem, index) => onSelect(index, selectedItem)}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder={hike.description}
        value={description}
        onChangeText={setDescription}
        height={40}
        padding={10}
        textAlignVertical="top"
        multiline
      />
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateHike}>
          <Text style={styles.updateButtonText}>Update Hike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteHike}>
          <Text style={styles.deleteButtonText}>Delete Hike</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
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
  updateButton: {
    backgroundColor: "black",
    padding: 16,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 40,
    alignItems: "center",
    width: "50%",
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 16,
    marginBottom: 10,
    borderRadius: 40,
    alignItems: "center",
    width: "50%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DetailScreen;