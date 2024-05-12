"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/store";

import Header from "@/components/layout/header";
import Sider from "@/components/layout/sider";
import FloatButton from "@/components/float-button";
import { setUser } from "@/store/features/user-slice";
import { getMe } from "@/actions/auth";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();

        storeRef.current.dispatch({
            type: "user/initialize",
        });
    }

    useEffect(() => {
        getMe().then((res) => {
            if (res.data) {
                storeRef.current?.dispatch(setUser(res.data));
            }

            if (res.error) {
                console.error(res.error);
            }
        });
    }, []);

    return (
        <Provider store={storeRef.current}>
            <Header />
            <div className="w-full flex flex-1 justify-between">
                <Sider />
                <main className="w-full py-4 px-2 sm:p-8">
                    {children}
                    <FloatButton />
                </main>
            </div>
        </Provider>
    );
};
