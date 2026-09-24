"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function BlocksError(props: RouteErrorProps) {
  return <RouteError {...props} />;
}
