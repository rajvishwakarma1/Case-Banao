"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient();

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Provider;