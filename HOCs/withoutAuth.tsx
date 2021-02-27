import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { useSelector } from "react-redux";
import { Store } from "redux";
import { axios } from "../Axios";
import { Redux } from "../interfaces/Redux";

export const withoutAuth = (WrappedComponent: NextPage): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    const { currentUser } = useSelector((state: Redux) => state.user);
    // if (typeof window !== "undefined" && currentUser && currentUser._id) {
    //   console.log("withoutAuth client");
    //   Router.replace("/");
    //   return <></>;
    // }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    console.log("withoutAuth server");
    if (
      typeof window === "undefined" &&
      ctx.req &&
      ctx.req.headers.cookie &&
      ctx.res &&
      // @ts-ignore
      ctx.currentUser
    ) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    }

    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }
    return { ...componentProps };
  };
  return HocComponent;
};
