import React, { useState } from 'react';
import { StyleSheet, Dimensions, Picker, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import Modal from "react-native-modal";


var { height, width } = Dimensions.get('window');

export default MyPicker = (props) => {
    const [val, setVal] = useState('M')
    return (
        <Modal
            animationIn="slideInRight"
            animationOut="slideOutRight"
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
            onBackdropPress={props.close}
            isVisible={props.show}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.picker}>

                    <Picker
                        onValueChange={(itemValue, itemIndex) =>
                            setVal(itemValue)
                        }
                        selectedValue={val}
                        style={{ height: 200, width: 200 }}
                    >
                        {props.data && props.data.map((val, i) => (
                            <Picker.Item key={i} label={val.label} value={val.value} />
                        ))}

                    </Picker>
                    <Button
                        onPress={() => props.submit(val)}

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

        </Modal>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            alignItems: 'center',
        },

        picker: {
            justifyContent: 'center',
            width: 200,
            height: 400,
            alignItems: 'center',
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 40,
            textAlign: 'center',
        }
    },



);