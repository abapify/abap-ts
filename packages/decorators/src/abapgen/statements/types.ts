import { Token } from './base/token';
import { ExistingType, ExistingTypeMeta } from './types/existing';
import { AbapType, AbapTypeMeta } from './types/predefined';
import { RefToType, RefToTypeMeta } from './types/ref_to';

export type Type = AbapType | ExistingType | RefToType;
export type TypeMeta = AbapTypeMeta | ExistingTypeMeta | RefToTypeMeta;
