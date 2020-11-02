import React from "react";
import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
    Cookies.remove("session");
    Cookies.set("session", session, { expires: 1 });
};

export const getSessionCookie = () => {

    const sessionCookie = Cookies.get("session");

    if (sessionCookie === undefined) {
        return null;
    } else {
        return sessionCookie;
    }
};

export const SessionContext = React.createContext(getSessionCookie());
