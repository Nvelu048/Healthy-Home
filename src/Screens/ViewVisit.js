/*
  ViewVisit.js

  View medical record and user can delete the record
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import Fonts from '../Util/fonts';
import {connect} from 'react-redux';
import {deleteVisit} from '../Redux/actions';
import Realm from '../realm';
import colors from '../Util/colors';
/*
  DisplayText component to display record item.
 */
const DisplayText = (props) => (
  <Text style={[styles.text, styles.container]}>
    <Text style={styles.title}>{props.title}</Text> {'\n\t'}
    {props.description}
  </Text>
);
/*
  DisplayArray component to display record item that is of Array type
 */
const DisplayArray = (props) => (
  <View style={styles.container}>
    <Text style={[styles.title, styles.text]}>
      {props.title}
      {'\n'}
    </Text>

    {props.description.map((medicine, index) => (
      <DisplayText
        key={index}
        title={`${index + 1}.\t${medicine.name}`}
        description={medicine.dosage}
      />
    ))}
  </View>
);

const ViewVisit = (props) => {
  const {visitInfo} = props.route.params;
  const {medication} = props.route.params;
  let dateOfVisit = new Date(visitInfo.dateOfVisit);
  let dateOfVisitString = `${dateOfVisit.getDate()} - ${
    dateOfVisit.getMonth() + 1
  } - ${dateOfVisit.getFullYear()}`;

  /*
    deleteVisit
      Deletes the current visit in Realm and Redux
   */
  function deleteVisit() {
    Alert.alert(
      'Delete Visit',
      'Are you Sure to Delete the Visit',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            props.deleteVisit(visitInfo.id);
            Realm.write(() => {
              let id = visitInfo.id;
              Realm.delete(Realm.objectForPrimaryKey('Visit', visitInfo.id));
              props.navigation.goBack();
            });
          },
        },
      ],
      {cancelable: false},
    );
  }
  console.log('medication');
  console.log(medication);
  return (
    <ScrollView>
      <DisplayText title={'Date of Visit'} description={dateOfVisitString} />
      <DisplayText
        title={'Hospital Name'}
        description={visitInfo.hospitalName}
      />
      <DisplayText title={'Doctor Name'} description={visitInfo.doctorName} />
      <DisplayText title={'Reason '} description={visitInfo.reason} />
      <DisplayText
        title={'Doctor Statement'}
        description={visitInfo.doctorStatement}
      />
      <DisplayArray title={'Medication'} description={medication} />
      <Pressable onPress={deleteVisit} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete Visit</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  text: {
    fontSize: Fonts.Medium,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  deleteButtonText: {
    fontSize: Fonts.Medium,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: colors.danger,
    padding: 8,
    borderRadius: 8,
  },
});

ViewVisit.defaultProps = {
  hospitalName: 'Anand Hospital',
  doctorName: 'Anand',
  dateOfVisit: new Date().getTime(),
  medication: [
    {
      name: 'Pendits',
      dosage: '1 Tablet at night',
    },
    {
      name: 'Voveran',
      dosage: '1 Tablet at morning and 1 at night',
    },
  ],
  doctorStatement: 'Take Medication',
  reason: 'Back pain',
};

ViewVisit.options = {
  topBar: {
    title: {
      text: 'View Visit',
    },
  },
};

export default connect(null, {deleteVisit})(ViewVisit);
