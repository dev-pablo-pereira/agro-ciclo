import { create } from "zustand";

type State = {
  currentUser: number | null;
};

type Actions = {
  addCurrentUser: (idUser: number) => void;
};

const useCurrentUser = create<State & Actions>()((set) => ({
  currentUser: null,
  addCurrentUser: (idUser) => {
    set((state) => ({
      currentUser: idUser,
    }));
  },
}));

export default useCurrentUser;
