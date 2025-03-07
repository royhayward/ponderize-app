export interface Scripture {
  week: number;
  year: number;
  reference: string;
  text: string;
  imageUrl: string;
  historicalContext: string;
  gospelTeaching: string;
  personalTestimony: string;
}

export interface ScriptureFormData extends Scripture {
  // Add any form-specific fields if needed
}