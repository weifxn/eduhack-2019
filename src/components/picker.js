import React from 'react';
import { StyleSheet,Dimensions, Picker, View, TouchableWithoutFeedback,  TouchableOpacity} from 'react-native';
import { Button } from 'react-native-ui-kitten';
var {height, width} = Dimensions.get('window');

export default MyPicker = (props) => {

    return(
    <View style={styles.container}>
    {props.show &&
        <TouchableWithoutFeedback
        style={{ zIndex: 4, height: height, width: width, alignItems: 'center', position: 'absolute'}}
        onPress={props.close}
      >
        <View style={{ zIndex: 4, height: height, width: width,  alignItems: 'center', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)'}}>
           
              <View style={styles.picker}>
  
                <Picker
                  selectedValue={this}
                  style={{ height: 200, width: 200 }}
                >
  
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
  
                </Picker>
                <Button
                            onPress={props.submit}

                 style={{ margin: 10, marginTop: 40 }}>
            Submit
          </Button>
          <Button
            onPress={props.close}
  
            appearance="ghost">
            Back
          </Button>
              </View>
              
            </View>
            </TouchableWithoutFeedback>
          }
          </View>
    )
}

const styles = StyleSheet.create(
    {
    container: {
        zIndex: 4,
        position: 'absolute',
        top: 0,
        left: 0,
    },

      picker: {
        top: height/4,
        zIndex: 10,
        justifyContent: 'center',
        width: 200,
        height: 400,
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 40,
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 10.00,
  
        elevation: 10,
      }
    },
  
  
  
  );