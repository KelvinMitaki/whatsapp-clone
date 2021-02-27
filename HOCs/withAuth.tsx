import React from "react";
import Router from "next/router";
import { NextPageContext } from "next";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { axios } from "../Axios";
import { Store } from "redux";

export const withAuth = (WrappedComponent: any): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    const { currentUser } = useSelector((state: Redux) => state.user);
    if (
      typeof window !== "undefined" &&
      ((currentUser && !currentUser._id) || !currentUser)
    ) {
      // Router.push("/login");
      window.location.replace("/login");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    if (
      typeof window === "undefined" &&
      ctx.res &&
      // @ts-ignore
      !ctx.currentUser
    ) {
      ctx.res.writeHead(301, { Location: "/login" });
      ctx.res.end();
      return;
    }
    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }
    return { ...componentProps };
  };

  return HocComponent;
};
