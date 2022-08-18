import create from "zustand";
interface PageState {
  page: number;
  next: () => void;
  previous: () => void;
}

export const usePageStore = create<PageState>((set) => ({
  page: 1,
  next: () => set((state) => ({ page: state.page + 1 })),
  previous: () => set((state) => ({ page: state.page - 1 })),
}));
