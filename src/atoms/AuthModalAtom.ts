import { atom } from "recoil";

export interface AuthModalState {
  isOpen: boolean;
  view: "login" | "signup" | "resetPassword";
}

const defautlModalState: AuthModalState = {
  isOpen: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "AuthModalState",
  default: defautlModalState,
});
