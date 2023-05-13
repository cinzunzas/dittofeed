import * as crypto from "crypto";

import { JSONValue } from "./types";

export function generateDigest({
  sharedSecret,
  rawBody,
}: {
  sharedSecret: string;
  rawBody: string;
}) {
  return crypto
    .createHmac("sha1", sharedSecret)
    .update(Buffer.from(rawBody, "utf-8"))
    .digest("hex");
}

export function generateSecureHash({
  key,
  value,
}: {
  key: string;
  value: JSONValue;
}): string {
  const stringified = JSON.stringify(value);

  // Create a hmac object using the provided secret
  const hmac = crypto.createHmac("sha256", key);

  // Update the hmac with the stringified data
  hmac.update(stringified);

  // Generate the hash
  const hash = hmac.digest("hex");

  return hash;
}

export function generateSecureKey(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}
