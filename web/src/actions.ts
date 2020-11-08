import { UserState } from "./reducers/userReducer";

export type UserAction = { type: string, payload: UserState };

export const login = (user: UserState): UserAction => ({
  type: 'USER/LOGIN',
  payload: user
})