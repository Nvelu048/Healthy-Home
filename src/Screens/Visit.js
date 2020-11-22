/*
    Visit.js

    Create a Medical Visit Record
 */
import React, {useState, useEffect} from 'react';
import {
  Pressable,
  View,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {addVisit} from '../Redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import {UserInput, Button} from '../Components';
import Fonts from '../Util/fonts';
import colors from '../Util/colors';
import Utils from '../Util';
import {connect} from 'react-redux';
import Realm from '../realm';
import Icon from "react-native-vector-icons/EvilIcons";
const Visit = (props) => {
  /*
    State Data
   */
  const [hospitalName, setHospitalName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [reason, setReason] = useState('');
  const [doctorStatement, setDoctorStatement] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState(new Date());
  const [medication, setMedication] = useState([]);

  const [medicineName, setMedicineName] = useState('');
  const [dosageDescription, setDosageDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  /*
    Saves visit record on Realm and Redux Store
   */
  function onSave() {
    const saveData = {
      id: new Date().getTime(),
      hospitalName,
      doctorName,
      reason,
      doctorStatement,
      dateOfVisit: dateOfVisit.getTime(),
      medication,
    };
    props.addVisit(saveData);
    Realm.write(() => {
      const visitInfo = Realm.create('Visit', saveData);
      console.log(`Data written successfully ${visitInfo}`);
      props.navigation.goBack();
    });
  }
  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || dateOfVisit;
    setShowDatePicker(false);
    setDateOfVisit(currentDate);
  }
  /*
    List the medicine and it's dosage description
   */
  const MedicationItem = ({medicine, index}) => (
    <View styles={{margin: 8}}>
      <View style={styles.medicationContainer}>
        <Text style={{fontSize: Fonts.Medium, fontWeight: 'bold'}}>
          {medicine.name}
        </Text>

        <Pressable
          style={styles.deleteItem}
          onPress={() => {
            let filteredMedication = medication.filter(
              (med, currentIndex) => med.id != medicine.id,
            );
            setMedication([...filteredMedication]);
          }}>
          <Text style={{color: colors.danger}}>x</Text>
        </Pressable>
      </View>

      <Text style={{fontSize: Fonts.Small}}>{medicine.dosage}</Text>
    </View>
  );

  return (
    <ScrollView>
      <UserInput
        name={'Hospital Name'}
        value={hospitalName}
        setValue={(value) => setHospitalName(value)}
        placeholder={'Enter Hospital Name'}
      />
      <UserInput
        name={'Doctor Name'}
        value={doctorName}
        setValue={(value) => setDoctorName(value)}
        placeholder={'Enter Doctor Name'}
      />
      <UserInput
        name={'Reason'}
        value={reason}
        setValue={(value) => setReason(value)}
        multiline
        placeholder={'Enter Reason'}
      />
      <UserInput
        name={'Doctor Statement'}
        value={doctorStatement}
        setValue={(value) => setDoctorStatement(value)}
        multiline
        placeholder={'Input doctor statement'}
      />

      <View style={{flexDirection: 'column', padding: 8}}>
        <Text style={{fontSize: Fonts.Large, fontWeight: 'bold'}}>
          Date of Visit
        </Text>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <Text style={{fontSize: Fonts.Large}}>
            {Utils.formatDate(dateOfVisit)}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          textAlign: 'center',
          padding: 8,
        }}>
        <Text
          style={{
            fontSize: Fonts.Large,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Medications
        </Text>
        <View style={{flex: 1, flexDirection: 'column', margin: 8, border: 1}}>
          <UserInput
            name={'Medicine Name'}
            value={medicineName}
            setValue={(value) => setMedicineName(value)}
            placeholder={'Enter Medicine Name'}
          />

          <UserInput
            name={'Dosage Description'}
            value={dosageDescription}
            setValue={(value) => setDosageDescription(value)}
            placeholder={'Enter Dosage Description'}
          />
        </View>
        <Pressable
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderRadius: 1,
          }}
          onPress={() => {
            setMedication([
              ...medication,
              {
                id: new Date().getTime(),
                name: medicineName,
                dosage: dosageDescription,
              },
            ]);
            setMedicineName('');
            setDosageDescription('');
          }}>
          <Text
            style={{margin: 16, fontSize: Fonts.Large, textAlign: 'center'}}>
            Add Medication
          </Text>
        </Pressable>
        <ScrollView nestedScrollEnabled={true} style={{height: 100}}>
          {medication.length > 0 &&
            medication.map((medicine, index) => (
              <MedicationItem key={medicine.id} medicine={medicine} />
            ))}
        </ScrollView>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button text={'Save Visit'} onPress={onSave} />
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfVisit}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  medicationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteItem: {
    backgroundColor: colors.danger,
    height: 20,
    width: 20,
  },
});

Visit.options = {
  topBar: {
    title: {
      text: 'Create Visit',
    },
  },
};

export default connect(null, {addVisit})(Visit);
