import { create } from "zustand";

interface Store {
  isLoading: boolean;
  loading: () => void;
  done: () => void;
}

const useStore = create<Store>((set) => ({
  isLoading: false,
  loading: () => {
    console.log("loading");

    set({ isLoading: true });
  },
  done: () => {
    console.log("done");

    set({ isLoading: false });
  },
}));

export default useStore;
