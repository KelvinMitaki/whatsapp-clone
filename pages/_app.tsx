import "semantic-ui-css/semantic.min.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "../styles/register.css";
import { axios } from "../Axios";
import { UserContext } from "../Context/userContext";
import { User } from "../interfaces/User";
import { wrapper } from "../redux";
import nProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { ActionTypes } from "../redux/actions/types";

interface Props extends AppProps {
  user: User | null;
}

(Router as any).onRouteChangeStart = () => {
  nProgress.start();
};
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

function MyApp({ Component, pageProps, user }: Props) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <title>Whatsapp Web</title>
      </Head>
      <UserContext.Provider value={{ user }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  );
}

export interface FetchCurrentUserAction {
  type: ActionTypes.fetchCurrentUser;
  payload: User | null;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  try {
    const res = await axios.get("/api/currentUser", {
      headers: appContext.ctx.req?.headers
    });
    let appProps = {};
    if (App.getInitialProps) {
      appProps = await App.getInitialProps({
        ...appContext,
        ctx: { ...appContext.ctx, ...res.data }
      });
    }
    appContext.ctx.store.dispatch<FetchCurrentUserAction>({
      type: ActionTypes.fetchCurrentUser,
      payload: res.data.currentUser
    });
    return { ...appProps, user: res.data.currentUser };
  } catch (error) {
    console.log(error.response);
  }
};

export default wrapper.withRedux(MyApp);
