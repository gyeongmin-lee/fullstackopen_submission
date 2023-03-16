import axios from "axios";
import { useEffect, useState } from "react";
import NewDiary from "./components/NewDiary";
import { createDiary, getAllDiaries } from "./services/diaryService";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    getAllDiaries().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  const handleSubmit = (params: NewDiaryEntry) => {
    createDiary(params)
      .then((diary) => {
        setDiaries((prev) => prev.concat(diary));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <h2>Diary Entries</h2>
      <NewDiary createDiary={handleSubmit} errorMessage={error} />
      {diaries.map((diary) => (
        <div key={diary.id}>
          <strong>{diary.date}</strong>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
