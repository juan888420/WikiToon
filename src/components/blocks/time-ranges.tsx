import { Fragment } from "react";
import type { BlockScheduleLine } from "@/lib/data/blocks";
import { formatTimeRanges } from "@/lib/format";

/** A schedule line's ranges, separated by " · "; a range never wraps across lines. */
export function TimeRanges({ times }: { times: BlockScheduleLine["times"] }) {
  return formatTimeRanges(times).map((range, index) => (
    <Fragment key={range}>
      {index > 0 && " · "}
      <span className="whitespace-nowrap">{range}</span>
    </Fragment>
  ));
}
