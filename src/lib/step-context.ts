"use client";

import { createContext, useContext } from "react";

const StepContext = createContext(false);

export const StepProvider = StepContext.Provider;
export const useStepActive = () => useContext(StepContext);
