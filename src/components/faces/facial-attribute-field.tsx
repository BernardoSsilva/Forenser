'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FACIAL_ATTRIBUTE_LABELS, FACIAL_ATTRIBUTE_OPTIONS } from '@/lib/facial-attribute-options';
import type { FacialAttributes } from '@/lib/types';

export function FacialAttributeField({
  attributeKey,
  value,
  onChange,
}: {
  attributeKey: keyof FacialAttributes;
  value: string;
  onChange: (value: string) => void;
}) {
  const options = FACIAL_ATTRIBUTE_OPTIONS[attributeKey];

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={attributeKey}>{FACIAL_ATTRIBUTE_LABELS[attributeKey]}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={attributeKey} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
