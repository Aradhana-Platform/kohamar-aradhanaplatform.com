import React from "react";

export const TextDesign = {
    h1: (props: any) => (
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600" {...props} />
    ),

    h2: (props: any) => (
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700" {...props} />
    ),

    p: (props: any) => (
        <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-700 leading-8" {...props} />
    ),

    strong: (props: any) => (
        <strong className="text-red-500" {...props} />
    ),
};