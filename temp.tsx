// utils/schemas.ts
import { z } from 'zod';

export const SuiteSchema = z.object({
  id: z.string(),
  name: z.string(),
  tests: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  )
});

export const ReportSchema = z.array(
  z.object({
    executionId: z.string(),
    passed: z.number(),
    failed: z.number(),
  })
);