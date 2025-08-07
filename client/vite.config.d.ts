/** @type {import("vite").UserConfig} */
declare const _default: {
    plugins: (import("vite").Plugin<any> | import("vite").Plugin<any>[])[];
    resolve: {
        alias: {
            "@": string;
            "@server": string;
        };
    };
    server: {
        proxy: {
            "/api": {
                target: string;
                changeOrigin: boolean;
            };
        };
    };
};
export default _default;
