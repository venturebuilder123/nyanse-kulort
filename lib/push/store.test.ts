import { describe, expect, it } from "vitest";
import { parseSubscription } from "./store";

const ok = {
  subscription: { endpoint: "https://fcm.googleapis.com/fcm/send/abc", keys: { p256dh: "BPk", auth: "xyz" } },
  brand: "kulort", voice: "wingman", season: "deepAutumn", timeZone: "Europe/Amsterdam",
};

describe("parseSubscription", () => {
  it("accepts a normal subscription and keeps only the known fields", () => {
    expect(parseSubscription({ ...ok, email: "x@y.nl" })).toEqual({
      endpoint: ok.subscription.endpoint, p256dh: "BPk", auth: "xyz", brand: "kulort", voice: "wingman", season: "deepAutumn", time_zone: "Europe/Amsterdam",
    });
  });
  it("rejects non-https endpoints, unknown seasons and odd time zones", () => {
    expect(parseSubscription({ ...ok, subscription: { ...ok.subscription, endpoint: "http://x" } })).toBeNull();
    expect(parseSubscription({ ...ok, season: "winter" })).toBeNull();
    expect(parseSubscription({ ...ok, timeZone: "'; drop table" })).toBeNull();
    expect(parseSubscription(null)).toBeNull();
  });
});
