import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { useSelector } from "react-redux";
import { axios } from "../Axios";
import { Redux } from "../interfaces/Redux";

export const withoutAuth = (WrappedComponent: NextPage): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    const { currentUser } = useSelector((state: Redux) => state.user);
    if (typeof window !== "undefined" && currentUser && currentUser._id) {
      Router.replace("/");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    console.log(ctx.req?.headers);
    const res = await axios.get("/api/currentUser", {
      headers: ctx.req?.headers
    });
    if (
      typeof window === "undefined" &&
      ctx.req &&
      ctx.req.headers.cookie &&
      ctx.res
    ) {
      if (res.data.currentUser !== null) {
        ctx.res.writeHead(301, { Location: "/" });
        ctx.res.end();
        return;
      }
    }

    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }
    return { ...componentProps };
  };
  return HocComponent;
};
