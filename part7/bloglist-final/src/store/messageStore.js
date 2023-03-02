import { create } from "zustand";

const useMessageStore = create((set) => ({
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
}));

export default useMessageStore;
