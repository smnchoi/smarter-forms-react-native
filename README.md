# smarter-forms-react-native
No more boring forms - [React Hook Form](https://react-hook-form.com/get-started/#ReactNative)

# TL;DR
- This repository is designed to compare the differences between using vanilla React Native components and React Hook Form for creating forms.
- 이 레포지토리는 순수 리액트네이티브 컴포넌트 만으로 만든 Form 과 react-hook-form 으로 만든 Form 의 차이를 비교하기 위해 만들었습니다.


### App Images
<img src="https://user-images.githubusercontent.com/70505699/222128543-e1ce7c4e-2e4c-42db-9b2a-c164b182af76.png" width="400" />
<img src="https://user-images.githubusercontent.com/70505699/222128565-da466080-c16b-418d-8f13-65fad27bdde6.png" width="400" />
<img src="https://user-images.githubusercontent.com/70505699/222128657-316a5cc4-b373-4172-9d2e-fd359752ce73.png" width="400" />

<br/>

### Codes

1. [Vanila React Native Components](https://github.com/smnchoi/smarter-forms-react-native/commit/da58cee9aa148e3e38669f4b8128d36ec79f003b)
```
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
```

<br/>


2. [React Hook Form](https://github.com/smnchoi/smarter-forms-react-native/commit/5d9c1d7354c3cc6c0b17b06ad0a97dc1dc91b48f)
```
import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "./styles";

//* Define Form data type
type FormData = {
  username: string;
  email: string;
  password: string;
};

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function App() {
  //* User useForm Hook from react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();

  console.log("데이터가 변할때마다 실시간으로 관찰 가능함\n", watch());

  const onSubmit = (data: FormData) => {
    Alert.alert("Forms are submitted!");
    reset();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Username"
            autoCapitalize="none"
          />
        )}
        name="username"
        rules={{ required: "Username is required" }}
        defaultValue=""
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: emailRegex,
            message: "Email is not valid",
          },
        }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Password"
            secureTextEntry
          />
        )}
        name="password"
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Password is too short" },
        }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

```

