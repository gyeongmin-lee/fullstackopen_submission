import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Password confirm is required"),
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

export const SignUpContainer = ({ onSubmit }) => {
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
          <FormikTextInput
            name="passwordConfirm"
            placeholder="Confirm Password"
            secureTextEntry
            testID="passwordConfirm"
          />
          <Pressable style={styles.submitBtn} onPress={handleSubmit}>
            <Text color="white" fontWeight="bold" style={styles.submitBtnText}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data: signUpData } = await signUp({ username, password });
      console.log("signUpData", signUpData);

      const { data: signInData } = await signIn({ username, password });
      console.log("signInData", signInData);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
