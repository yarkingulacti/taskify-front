import { create } from "zustand";

interface Store {
  isPageLoading: boolean;
  isRestLoading: boolean;
  restLoading: () => void;
  restLoaded: () => void;
  pageLoading: () => void;
  pageLoaded: () => void;
}

const useCustomStore = create<Store>((set) => ({
  isPageLoading: false,
  isRestLoading: false,
  restLoading: () => {
    set({ isRestLoading: true });
  },
  restLoaded: () => {
    set({ isRestLoading: false });
  },
  pageLoading: () => {
    set({ isPageLoading: true });
  },
  pageLoaded: () => {
    set({ isPageLoading: false });
  },
}));

export default useCustomStore;
