/**
 * Common global types
 */

export type Status = 'pending' | 'active' | 'completed' | 'cancelled';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

