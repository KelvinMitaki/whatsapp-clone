import { Redux } from "../interfaces/Redux";
import { AnyAction, Store } from "redux";
import { GetServerSidePropsContext } from "next-redux-wrapper";

export const withAuth = (
  ctx: GetServerSidePropsContext & {
    store: Store<any, AnyAction>;
  }
) => {
  if (!(ctx.store.getState() as Redux).user.currentUser) {
    return false;
  }
  return true;
};
