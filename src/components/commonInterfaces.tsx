import {
  GEM,
  PLATINUM,
  PREMIERE,
  SUBSCRIPTION,
} from '@/components/profile/Constants';

export interface PlanChosen {
  type: typeof SUBSCRIPTION| typeof GEM;
  name?: typeof PREMIERE| typeof PLATINUM| 'Basic';
  billing?: 'Monthly' | 'Annual';
  total?: number;
  monthly?: number;
  description: string;
  gems?: number;
  price?: number;
  discount?: string;
}