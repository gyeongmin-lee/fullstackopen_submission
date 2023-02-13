const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ total }) => <strong>total of {total} exercises</strong>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} />
    ))}
  </div>
);

const Course = ({ course }) => {
  const parts = course.parts;
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
