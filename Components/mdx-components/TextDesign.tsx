import React from "react";

export const TextDesign = {
    h1: (props: any) => (
        <h1 className="text-4xl font-bold text-blue-600" {...props} />
    ),

    h2: (props: any) => (
        <h2 className="text-2xl font-semibold text-green-600" {...props} />
    ),

    p: (props: any) => (
        <p className="text-lg text-gray-700 leading-8" {...props} />
    ),

    strong: (props: any) => (
        <strong className="text-red-500" {...props} />
    ),
};