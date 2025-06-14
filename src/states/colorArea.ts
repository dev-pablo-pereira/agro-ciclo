import { create } from "zustand";

type State = {
  color: string;
};

type Actions = {
  addColor: (color: string) => void;
};

const useAddColor = create<State & Actions>()((set) => ({
  color: "",
  addColor: (color) => {
    set((state) => ({
      color: color,
    }));
  },
}));

export default useAddColor;
