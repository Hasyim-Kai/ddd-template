export const config = {
  apibaseUrl: import.meta.env.VITE_API_BASE_URL,
  apiAssetUrl: import.meta.env.VITE_API_ASSET_URL,
};

export function addBaseAssetUrlBE(assetUrl: string) {
  return config.apiAssetUrl + assetUrl
}
