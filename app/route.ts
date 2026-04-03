import { getASN } from "@/lib/asn";
import { getDataCenter } from "@/lib/datacenter";
import { getHosting } from "@/lib/hosting";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const ipSchema = z.ipv4().or(z.ipv6());

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const result = ipSchema.safeParse(query);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid IP Address" }, { status: 400 });
  }

  const asnResult = getASN(result.data);

  if (!asnResult.success) {
    return NextResponse.json({ error: asnResult.error }, { status: 404 });
  }

  const isHosting = await getHosting(asnResult.asn!);

  const isLikelyDataCenter = await getDataCenter(asnResult.org!);

  return NextResponse.json({
    success: asnResult.success,
    ip: result.data,
    asn: asnResult.asn,
    org: asnResult.org,
    isHosting: isHosting.isHosting,
    isLikelyDataCenter: isLikelyDataCenter.isLikelyDataCenter
  });
}
