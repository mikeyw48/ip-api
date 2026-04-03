import maxmind, { AsnResponse } from "maxmind";

const lookup = await maxmind.open<AsnResponse>("./data/geolite2-asn.mmdb");

export function getASN(query: string) {
  try {
    const result = lookup.get(query);

    if (!result) {
      return {
        success: false,
        error: "No ASN found for IP",
      };
    }

    return {
      success: true,
      asn: result.autonomous_system_number,
      org: result.autonomous_system_organization,
    };
  } catch (err) {
    return {
      success: false,
      error: "Invalid IP or ASN lookup failure",
    };
  }
}
