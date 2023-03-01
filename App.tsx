import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { styles } from "./styles";

export default function App() {
  //* Form values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //* Form Error Values
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //* Username Error Value handling
  useEffect(() => {
    handelUsernameError();
  }, [username]);

  useEffect(() => {
    handelEmailError();
  }, [email]);

  useEffect(() => {
    handelPasswordError();
  }, [password]);

  //* Email Error Value handling
  const handelUsernameError = () => {
    // Empty username
    if (!username) {
      setUsernameError("Username is required");
      return;
    }

    // Valid case -> No Error Message
    setUsernameError("");
  };

  //* Email Error Value handling
  const handelEmailError = () => {
    // Empty email
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    // Not valid email
    if (!isValidEmail(email)) {
      setEmailError("Email is not vaild!");
      return;
    }

    // Valid case -> No Error Message
    setEmailError("");
  };

  //* Password Error Value handling
  const handelPasswordError = () => {
    // Empty password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Not valid password
    if (!isValidPassword(password)) {
      setPasswordError("Password is too short!");
      return;
    }

    // Valid case -> No Error Message
    setPasswordError("");
  };

  //* Email validator
  const isValidEmail = (email: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  //* Password validator
  const isValidPassword = (password: string) => {
    return password.trim().length >= 6;
  };

  //* Submit Button handling
  const handleSubmit = () => {
    // Exceptions handling
    if (usernameError) return;
    if (emailError) return;
    if (passwordError) return;

    // All good
    Alert.alert("Forms are submitted!");

    // reset
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
