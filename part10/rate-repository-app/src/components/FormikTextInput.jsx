import { useField } from "formik";
import { StyleSheet, View } from "react-native";

import theme from "../theme";
import Text from "./Text";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  errorText: {
    paddingTop: 5,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.wrapper}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
