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
