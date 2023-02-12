const Part = ({ course }) => {
  return (
    <p>
      {course.part} {course.exercises}
    </p>
  );
};

export default Part;
