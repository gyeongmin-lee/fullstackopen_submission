import Part from "./Part";

const Content = ({ courseInfo }) => {
  return courseInfo.map((course) => <Part key={course.part} course={course} />);
};

export default Content;
