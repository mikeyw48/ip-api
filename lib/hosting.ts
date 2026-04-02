import { promises as fs } from "fs";

const file = await fs.readFile(
  process.cwd() + "/data/hosting-providers.json",
  "utf-8",
);
const hostingArr = JSON.parse(file);
const hostingMap = new Map<number, { org_name: string }>();
hostingArr.forEach((h: { asn: number; org_name: any; }) => hostingMap.set(h.asn, { org_name: h.org_name }));

export async function getHosting(asn: number) {
  try {
    const result = hostingMap.get(asn);

    if (!result) {
      return {
        success: false,
        error: "No Hosting found for ASN",
        isHosting: false,
      };
    }

    return {
      success: true,
      isHosting: true,
    };
  } catch (err) {
    return {
      success: false,
      error: "Hosting lookup failed",
      isHosting: false,
    };
  }
}
