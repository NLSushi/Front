import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Controller } from 'react-hook-form';

// SignIn, SignUp 등 다양한 화면에서 사용되는 textinput
// Controller 사용해서 submit 할 값 control, error 도 handling
const CustomInput = ({ control, name, rules = {} , placeholder, secureTextEntry, autoFocus, defaultValue, editable}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style={styles.input}>
                        <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            autoFocus={autoFocus}
                            defaultValue={defaultValue}
                            editable={editable}
                        />
                        {error && (
                        <Text style={{color: '#FD7B7B', fontSize: 12, marginTop: 2}}>{error.message || 'Error'}</Text>
                        )}
                    </View>
                </>
            )}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 18,
        alignSelf: 'center',
    }
})
export default CustomInput;
