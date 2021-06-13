export interface AssetAllocation {
  id: string;
  name: string;
  value: number;
  percentage: number;
  children?: Array<AssetAllocation>;
}
