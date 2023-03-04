import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMessageStore = create(
  devtools(
    (set) => ({
      message: "",
      errorMessage: "",
      showMessage: (message) => {
        set({ message });
        setTimeout(() => set({ message: "" }), 5000);
      },
      showErrorMessage: (errorMessage) => {
        set({ errorMessage });
        setTimeout(() => set({ errorMessage: "" }), 5000);
      },
    }),
    { name: "messageStore" }
  )
);

export default useMessageStore;
