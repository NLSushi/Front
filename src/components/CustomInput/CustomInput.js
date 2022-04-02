import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({ control, name, rules = {} , placeholder, secureTextEntry, autoFocus, defaultValue}) => {
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
