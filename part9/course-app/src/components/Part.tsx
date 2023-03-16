import { CoursePart } from "../types";

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </p>
          <p>{props.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </p>
          <p>project exercises {props.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </p>
          <p>{props.description}</p>
          <p>read more: {props.backroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </p>
          <p>{props.description}</p>
          <p>required skills: {props.requirements.join(", ")}</p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
