// src/types/consultation.types.ts
import { RecordModel } from 'pocketbase';

// Base PocketBase record fields that all collections have
export interface BaseRecord extends RecordModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// Consultation types
export type ConsultationType = 'general' | 'risk-assessment' | 'compliance-review' | 'audit-preparation';
export type ConsultationStatus = 'active' | 'completed';

// Main consultation interface
export interface Consultation extends BaseRecord {
  // Custom fields we added
  topic: string;
  description: string;
  type?: ConsultationType;
  status?: ConsultationStatus;
  userId: string;
  metadata?: ConsultationMetadata;
  
  // Optional expanded relations (when using expand parameter)
  expand?: {
    userId?: User;
  };
}

// Metadata structure (stored as JSON)
export interface ConsultationMetadata {
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  riskScore?: number;
  estimatedCompletionTime?: number;
  [key: string]: any; // Allow additional properties
}

// User type (from PocketBase users collection)
export interface User extends BaseRecord {
  email: string;
  name?: string;
  avatar?: string;
  verified: boolean;
  emailVisibility: boolean;
}

// Types for creating/updating consultations (without system fields)
export type CreateConsultationDto = {
  topic: string;
  description: string;
  type?: ConsultationType;
  status?: ConsultationStatus;
  userId?: string; // Optional because we can get it from auth
  metadata?: ConsultationMetadata;
};

export type UpdateConsultationDto = Partial<CreateConsultationDto>;

// API Response types
export interface ConsultationListResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Consultation[];
}

// Filter types for querying
export interface ConsultationFilters {
  status?: ConsultationStatus;
  type?: ConsultationType;
  userId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}