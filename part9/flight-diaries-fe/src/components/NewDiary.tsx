import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface NewDiaryProps {
  createDiary: (params: NewDiaryEntry) => void;
  errorMessage: string | undefined;
}

const NewDiary = ({ createDiary, errorMessage }: NewDiaryProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createDiary({ date, weather, visibility, comment });

    setDate("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Good);
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <div>
          date
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type="date"
          />
        </div>
        <div>
          weather
          <select
            value={weather}
            onChange={({ target }) => setWeather(target.value as Weather)}
          >
            {Object.values(Weather).map((weather) => (
              <option key={weather} value={weather}>
                {weather}
              </option>
            ))}
          </select>
        </div>
        <div>
          visibility
          <select
            value={visibility}
            onChange={({ target }) => setVisibility(target.value as Visibility)}
          >
            {Object.values(Visibility).map((visibility) => (
              <option key={visibility} value={visibility}>
                {visibility}
              </option>
            ))}
          </select>
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiary;
