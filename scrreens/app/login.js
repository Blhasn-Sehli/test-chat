import { Alert, View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const Login = ({ navigation }) => {
    const auth = FIREBASE_AUTH;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            Alert.alert("Login successful")
            navigation.navigate("chat")
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    const register = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            Alert.alert("Register successful")
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 12 }}>
            <TextInput
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                autoCapitalize="none"
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10, fontSize: 16, borderRadius: 10, padding: 12, backgroundColor: "#f6f7fb" }} />
            <TextInput
                autoCorrect={true}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                autoCapitalize="none"
                style={{ fontSize: 16, borderRadius: 10, padding: 12, backgroundColor: "#f6f7fb" }} />
            <TouchableOpacity
                onPress={login}
                style={{ backgroundColor: "#f57c00", height: 58, borderRadius: 10, alignItems: "center", marginTop: 40, justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={register}
                style={{ backgroundColor: "#292929", height: 58, borderRadius: 10, alignItems: "center", marginTop: 40, justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 16 }}>register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login