"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function ChannelsError(props: RouteErrorProps) {
  return <RouteError {...props} />;
}
