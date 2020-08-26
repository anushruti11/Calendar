//to add event in Device Calendar
import React, { Component } from 'react';
//Import React
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//Import basic react native components
import * as AddCalendarEvent from 'react-native-add-calendar-event';
//Import library for AddCalendarEvent
import moment from 'moment';

const EVENT_TITLE = 'Meeting';
const TIME_NOW_IN_UTC = moment.utc();

const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;
};

export default class App extends Component {
  state = { text: '' };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Event title: {EVENT_TITLE}
          {'\n'}
           Date & Time:{' '}
          {moment
            .utc(TIME_NOW_IN_UTC)
            .local()
            .format('lll')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            App.addToCalendar(EVENT_TITLE, TIME_NOW_IN_UTC);
          }}>
          <Text>Add Event to Calender</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="ENTER EVENT ID"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.buttonHalf}
            onPress={() => {
              App.editCalendarEventWithId(this.state.text);
            }}>
            <Text style={{ textAlign: 'center' }}>Edit Event</Text>
          </TouchableOpacity>
          <View style={{ margin: 5 }} />
          <TouchableOpacity
            style={styles.buttonHalf}
            onPress={() => {
              App.showCalendarEventWithId(this.state.text);
            }}>
            <Text style={{ textAlign: 'center' }}>View Event</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL('https://calendar.google.com/calendar')
          }>
          <Text style={{ textAlign: 'center' }}> View all Events</Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  static addToCalendar = (title: string, startDateUTC: moment) => {

    const eventConfig = {
      title,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),

      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
        titleColor: 'blue',
      },
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          alert('eventInfo -> ' + JSON.stringify(eventInfo));
        }
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        alert('Error -> ' + error);
      });
  };

  static editCalendarEventWithId = (eventId: string) => {
    const eventConfig = {
      eventId,
    };

    AddCalendarEvent.presentEventEditingDialog(eventConfig)
      .then(eventInfo => {
        alert('eventInfo -> ' + JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        alert('Error -> ' + error);
      });
  };

  static showCalendarEventWithId = (eventId: string) => {
    const eventConfig = {
      eventId,
      allowsEditing: true,
      allowsCalendarPreview: true,
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
      },
    };

    AddCalendarEvent.presentEventViewingDialog(eventConfig)
      .then(eventInfo => {
        alert('eventInfo -> ' + JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        alert('Error -> ' + error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 40,
  },
  heading: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  buttonHalf: {
    alignItems: 'center',
    backgroundColor: '#98fb98',
    padding: 10,
    flex: 1,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    fontWeight:'bold',
    backgroundColor: '#b0e0e6',
  },
});
