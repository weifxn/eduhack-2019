import React from 'react';
import { TextInput } from 'react-native'

function myInput(props) {
    return (
        <TextInput
            {...props}
            style={[{
                width: '80%',
                height: 50,
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 15,
                textAlign: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.10,
                shadowRadius: 10.00,

                elevation: 10,
            }, props.style]}
        />
    )
}

export default myInput;