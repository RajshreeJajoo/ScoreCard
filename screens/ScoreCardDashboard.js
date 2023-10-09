import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useState, useEffect} from 'react';
import {Avatar, Button, Card} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import CircularProgress from 'react-native-circular-progress-indicator';

const ScoreCardDashboard = () => {
  const [detailList, setDetailList] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [sortDetails, setSortDetails] = useState([]);
  const [color, setColor] = useState();
  const [performance, setPerformance] = useState();
  const [avg, setAvg] = useState(0);
  const {navigate} = useNavigation();
  useEffect(() => {
    axios.get('https://cod-students.free.beeceptor.com/student-scores').then(response => {
        setDetailList(response.data);
        console.log("response",response.data)
        let sum = 0;
        {
          detailList?.data?.map((detail, i) => {
            sum = sum + detail.scoreInPercentage
            return setAvg((sum)/5);
          });
        }
        if (avg < 40) {
          setColor('red');
          setPerformance('Poor!');
        } else if (40 < avg < 80) {
          setColor('#19BDFF');
          setPerformance('Good!');
        } else {
          setColor('green');
          setPerformance('Excellent!');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [avg]);

  const data = [
    {label: 'Name', value: 'Name'},
    {label: 'Percentage(Asc)', value: 'Percentage(Asc)'},
    {label: 'Percentage(Desc)', value: 'Percentage(Desc)'},
  ];

  const dropDownAction = item => {
    setValue(item.value);
    setIsFocus(false);
    if (item.value === 'Name') {
      setSortDetails(
        detailList?.data?.sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        }),
      );
    } else if (item.value === 'Percentage(Asc)') {
      setSortDetails(
        detailList?.data?.sort(function (a, b) {
          return a.scoreInPercentage - b.scoreInPercentage;
        }),
      );
    } else {
      setSortDetails(
        detailList?.data?.sort(function (a, b) {
          return b.scoreInPercentage - a.scoreInPercentage;
        }),
      );
    }
  };
 console.log("avg",avg)
  return (
    <>
      <View style={{backgroundColor: 'white', margin: '5%'}}>
        <Card style={{backgroundColor: 'white'}}>
          <Card.Title
            title= "  Average Scorecard"
            subtitle= {performance}
            left={props => (
              <CircularProgress
                value={avg}
                radius={28}
                duration={0}
                progressValueColor="black"
                maxValue={100}
                activeStrokeColor={color}
                title={'%'}
                titleColor="black"
                titleStyle={{fontWeight: 'bold'}}
              />
            )}
          />

          <Card.Content>
            <Text style={{marginLeft: '18%'}}>
              of {detailList.total} students passed
            </Text>
          </Card.Content>
        </Card>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginLeft: '6%', fontWeight: 'bold', fontSize: 16}}>
          Sort By:
        </Text>
        <View style={{width: '46%', marginLeft: '24%'}}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => dropDownAction(item)}
          />
        </View>
      </View>
      <ScrollView>
        <View>
          {/* <ScrollView> */}
          {((detailList?.data)||sortDetails)?.map((detail, i) => {
            return (
              <View style={{margin: '5%'}} key={i}>
                <TouchableOpacity
                  onPress={() =>
                    navigate('ScoreCard', {
                      detail: detail,
                    })
                  }>
                  <Card style={{backgroundColor: 'white'}}>
                    <Card.Title
                      title={detail.firstName}
                      // subtitle={detail.scoreInPercentage}
                      subtitle= {detail.section.charAt(0).toUpperCase() + detail.section.slice(1)}
                      left={props => (
                        <Avatar.Text
                          {...props}
                          size={50}
                          label={detail.firstName[0].toUpperCase()}
                          backgroundColor={
                            detail.section === 'science' ? '#FA661B' : '#FBB03B'
                          }
                        />
                      )}
                      right={() => (
                        <CircularProgress
                          value={detail.scoreInPercentage}
                          radius={20}
                          progressValueColor="black"
                          maxValue={100}
                          duration={0}
                          activeStrokeColor={detail.scoreInPercentage<40?'red':detail.scoreInPercentage<80?'#19BDFF':'green'}
                          title={'%'}
                          titleColor="black"
                          titleStyle={{fontWeight: 'bold'}}
                        />
                      )}
                    />
                  </Card>
                </TouchableOpacity>
              </View>
            );
          })}
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 24,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'right',
  },
});
export default ScoreCardDashboard;
