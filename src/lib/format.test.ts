import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatTimeRanges, formatTimeZone, formatWeekdays, formatYearMonth } from "@/lib/format";

describe("block schedule formatting", () => {
  it("formats weekday groups as a recurring schedule", () => {
    assert.equal(formatWeekdays([1, 2, 3, 4, 5]), "Lunes a viernes");
    assert.equal(formatWeekdays([5, 6, 7]), "Viernes a domingo");
    assert.equal(formatWeekdays([1, 2, 3, 4, 5, 6, 7]), "Todos los días");
    assert.equal(formatWeekdays([6]), "Sábados");
    assert.equal(formatWeekdays([5]), "Viernes");
    assert.equal(formatWeekdays([6, 7]), "Sábados y domingos");
    assert.equal(formatWeekdays([1, 3, 5]), "Lunes, miércoles y viernes");
  });

  it("formats time ranges, months and time zones from their strings", () => {
    assert.deepEqual(
      formatTimeRanges([
        { startTime: "23:00", endTime: "01:00" },
        { startTime: "00:00", endTime: null },
      ]),
      ["23:00–01:00", "desde 00:00"],
    );
    assert.equal(formatYearMonth("2005-10"), "oct 2005");
    assert.equal(formatYearMonth("2005"), "2005");
    assert.equal(formatTimeZone("America/Argentina/Buenos_Aires"), "hora de Buenos Aires");
  });
});
