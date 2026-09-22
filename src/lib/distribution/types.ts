import { Article, DistributionPlatform, PlatformCapability } from "../blog/types";

export interface DistributionResult {
  platform: DistributionPlatform;
  success: boolean;
  externalId?: string;
  externalUrl?: string;
  canonicalUrl?: string;
  errorMessage?: string;
  manualActionUrl?: string;
  timestamp: string;
}

export interface PlatformConfig {
  platform: DistributionPlatform;
  name: string;
  capability: PlatformCapability;
  isConfigured: boolean;
  requiresManualAction: boolean;
  description: string;
}

export interface DistributionAdapter {
  platform: DistributionPlatform;
  getCapability(): PlatformConfig;
  publish(article: Article): Promise<DistributionResult>;
}
