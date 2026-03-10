import { Suspense } from "react";
import RouteFallback from "./RouteFallback";

export default function Lazy({ children }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}