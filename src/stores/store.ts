import { create } from "zustand";

interface Store {
  isLoading: boolean;
  loading: () => void;
  done: () => void;
}

const useCustomStore = create<Store>((set) => ({
  isLoading: false,
  loading: () => {
    set({ isLoading: true });
  },
  done: () => {
    set({ isLoading: false });
  },
}));

export default useCustomStore;
