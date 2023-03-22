import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  submitBtnText: {
    textAlign: "center",
  },
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            testID="username"
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            testID="password"
          />
          <Pressable style={styles.submitBtn} onPress={handleSubmit}>
            <Text color="white" fontWeight="bold" style={styles.submitBtnText}>
              Sign In
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log("data", data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
