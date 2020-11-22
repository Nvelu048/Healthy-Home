/*
  HistoryOfVisit.js

  Lists the Medical Records
 */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {VisitCard} from '../Components';
import colors from '../Util/colors';
import {Screens} from '../../App';
import {connect} from 'react-redux';
import Realm from '../realm';
import {setVisitData} from '../Redux/actions';
import Icon from 'react-native-vector-icons/EvilIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Fonts from '../Util/fonts';
const HistoryOfVisit = (props) => {
  const visits = props.visitList;
  /*
    Get the visit data from Realm DB and pushes to Redux
   */
  useEffect(() => {
    const visitInfo = Realm.objects('Visit');
    props.setVisitData(visitInfo);
  }, []);

  /*
    Navigates to ViewVisit Screen to view the selected Medical Record
   */
  function onVisitSelected(index) {
    const visitData = JSON.parse(JSON.stringify(visits[index]));
    const {medication} = visitData;
    console.log(visitData);
    console.log(medication);
    props.navigation.navigate(Screens.VIEW_VISIT, {
      visitInfo: visitData,
      medication: medication,
    });
  }
  /*
    Forms VisitCard Component for each of the medical record
   */
  const visitsTag = visits.map((visit, index, visits) => {
    return (
      <VisitCard
        key={index}
        visitInfo={visit}
        onPress={() => onVisitSelected(index)}
      />
    );
  });

  /*
    Renders No Data Found
   */
  const NoVisits = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="search" size={100} color={colors.grey} />
      <Text style={{fontSize: Fonts.Large, color: colors.grey}}>
        No Visit Data Available
      </Text>
    </View>
  );

  /*
    Floating Action Button that navigates to Create Medical Record
    Site
   */
  const Fab = () => (
    <Pressable
      style={styles.fab}
      onPress={() => {
        props.navigation.navigate(Screens.CREATE_VISIT);
      }}>
      <IonicIcon name={'add'} size={30} color={colors.white} />
    </Pressable>
  );

  return (
    <View style={{flex: 1}}>
      {visitsTag.length > 0 ? (
        <ScrollView contentContainerStyle={{position: 'relative'}}>
          {visitsTag}
        </ScrollView>
      ) : (
        <NoVisits />
      )}

      <Fab />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 25,
    width: 50,
    bottom: 8,
    right: 8,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

HistoryOfVisit.options = {
  topBar: {
    title: {
      text: 'Healthy Family',
    },
  },
};

const mapStateToProps = (state) => {
  const {visitList} = state;
  return {visitList: visitList};
};

export default connect(mapStateToProps, {setVisitData})(HistoryOfVisit);
