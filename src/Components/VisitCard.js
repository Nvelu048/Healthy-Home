import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Fonts from '../Util/fonts';

const ContentCard = (props) => (
  <Text style={styles.text}>
    <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
    {'\n\t'}
    {props.description}
  </Text>
);
const VisitCard = (props) => {
  let dateOfVisit = new Date(props.visitInfo.dateOfVisit);

  let dateOfDrVisit = `${dateOfVisit.getDate()} - ${
    dateOfVisit.getMonth() + 1
  } - ${dateOfVisit.getFullYear()}`;
  return (
    <Pressable style={styles.historyOfVisit} onPress={props.onPress}>
      <ContentCard title={'Date of Visit'} description={dateOfDrVisit} />

      <ContentCard title={'Reason'} description={props.visitInfo.reason} />

      <ContentCard
        title={'Doctor Statement'}
        description={props.visitInfo.doctorStatement}
      />

      <ContentCard
        title={'Doctor Name'}
        description={props.visitInfo.doctorName}
      />

      <ContentCard
        title={'Hospital Name'}
        description={props.visitInfo.hospitalName}
      />

      <ContentCard
        title={'Medication Count'}
        description={`Total: ${Object.keys(props.visitInfo.medication).length}`}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#121212',
    fontSize: Fonts.Medium,
  },
  historyOfVisit: {
    borderWidth: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#efefef',
    color: 'white',
    elevation: 5,
    borderRadius: 8,
  },
});

VisitCard.defaultProps = {
  hospitalName: 'Anand Hospital',
  doctorName: 'Anand',
  dateOfVisit: new Date(),
  medication: [],
  doctorStatement: 'Take Medication',
  reason: 'Backpain',
};

export default VisitCard;
