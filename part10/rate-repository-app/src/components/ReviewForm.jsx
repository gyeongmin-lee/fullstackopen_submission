import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: undefined,
  text: "",
};

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

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repo owner's name is required"),
  repositoryName: yup.string().required("Repo's name is required"),
  rating: yup.number().required("Rating is required").min(0).max(100),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="ownerName" placeholder="Repo owner's name" />
          <FormikTextInput name="repositoryName" placeholder="Repo's name" />
          <FormikTextInput
            name="rating"
            placeholder="Rating (0 to 100)"
            keyboardType="numeric"
          />
          <FormikTextInput name="text" placeholder="Review" multiline />
          <Pressable style={styles.submitBtn} onPress={handleSubmit}>
            <Text color="white" fontWeight="bold" style={styles.submitBtnText}>
              Create a review
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      const repoId = data.createReview.repositoryId;
      navigate(`/repository/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
