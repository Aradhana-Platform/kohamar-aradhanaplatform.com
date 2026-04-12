import React, { ReactNode } from "react";

interface ParaType {
    children: ReactNode;
}

export const Para = ({ children }: ParaType) => {
    return <div className="bg-amber-400 text-white font-bold">{children}</div>
}

// Text heading, paragraph styles...
export const EnterMdxComponent = {
    h1: (props: React.ComponentProps<"h1">) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900" {...props} />
    ),

    h2: (props: React.ComponentProps<"h2">) => (
        <h2 {...props} className="text-2xl font-semibold mt-6 mb-3 text-slate-800" />
    ),

    p: (props: React.ComponentProps<"p">) => (
        <span {...props} className="leading-7 mb-4 text-slate-600" />
    ),

    strong: (props: React.ComponentProps<"strong">) => (
        <strong className="text-red-500" {...props} />
    ),

    Para
};