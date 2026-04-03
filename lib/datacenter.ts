const keywords = [
  "data center",
  "datacenter",
  "cloud",
  "hosting",
  "infrastructure",
  "colocation",
  "colo",
];

export async function getDataCenter(org_name: string) {
  const name = org_name.toLowerCase();

  const result = keywords.some((keyword) => name.includes(keyword));

  if (result === false) {
    return {
      success: false,
      error: "Is likely not datacenter",
      isLikelyDataCenter: false,
    };
  }
  return {
    success: true,
    isLikelyDataCenter: true,
  };
}
