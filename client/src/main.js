import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const queryClient = new QueryClient();
// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } });
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(_jsx(React.StrictMode, { children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(RouterProvider, { router: router }), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }) }));
}
