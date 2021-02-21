import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import db from '../config';
import AppHeader from './AppHeader'

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  render() {
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.no}>Please Wait...</Text>
        </View>
      );
    } 
    else {
      return (
        <View style={styles.container}>
          <AppHeader />
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>
                <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      marginRight: 10,
                      color: 'white'
                    }}>
                    {student.roll_no}.
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                    {student.name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: '#1aff00' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var rollno = index + 1;
                      this.updateAttendence(rollno, 'present');
                    }}>
                    <Text
                      style={{ color: 'black' }}>
                      Present
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text
                      style={{ color: 'black' }}>
                      Absent
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.meow}
                onPress={() => {
                  this.props.navigation.navigate('SummaryScreen');
                }}>
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
text: {
  fontSize: 20,
  textAlign: 'center',
  },
meow: {
  margin: 50,
  height: 40,
  width: 100,
  borderRadius: 5,
  borderWidth: 3,
  borderColor: 'black',
  alignSelf: 'center',
  backgroundColor: 'gray'
},
container: {
  flex: 1,
  backgroundColor: 'black',
},
studentChartContainer: {
  flexDirection: 'row',
  padding: 10,
  alignItems: 'center',
  margin: 15,
  fontFamily: 'times',
},
presentButton: {
  width: 70,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  borderWidth: 2,
  backgroundColor: 'white'
},
absentButton: {
  width: 70,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  backgroundColor: 'white'
},
no: {
  fontFamily: 'times',
  fontWeight: 'bold',
  fontSize: 20,
},
});

export default HomeScreen;