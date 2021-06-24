/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAssetAllocations
// ====================================================

export interface GetAssetAllocations_assetAllocations_children {
  __typename: 'AssetAllocation';
  id: string;
  name: string;
  value: number;
  percentage: number;
}

export interface GetAssetAllocations_assetAllocations {
  __typename: 'AssetAllocation';
  id: string;
  name: string;
  value: number;
  percentage: number;
  children: GetAssetAllocations_assetAllocations_children[] | null;
}

export interface GetAssetAllocations {
  /**
   * returns the asset allocations for the specified account
   */
  assetAllocations: GetAssetAllocations_assetAllocations[];
}

export interface GetAssetAllocationsVariables {
  accountId: string;
}
