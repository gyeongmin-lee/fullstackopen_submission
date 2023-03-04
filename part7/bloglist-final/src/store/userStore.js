import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "messageStore" }
  )
);

export default useUserStore;
