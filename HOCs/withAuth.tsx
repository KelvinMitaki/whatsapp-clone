import React from "react";
import Router from "next/router";
import { NextPageContext } from "next";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { axios } from "../Axios";

export const withAuth = (WrappedComponent: any): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    console.log("auth client");
    const { currentUser } = useSelector((state: Redux) => state.user);
    if (
      typeof window !== "undefined" &&
      ((currentUser && !currentUser._id) || !currentUser)
    ) {
      Router.replace("/login");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    console.log("Auth");
    if (
      typeof window === "undefined" &&
      ctx.res &&
      // @ts-ignore
      !ctx.currentUser
    ) {
      ctx.res.writeHead(301, { Location: "/login" });
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
