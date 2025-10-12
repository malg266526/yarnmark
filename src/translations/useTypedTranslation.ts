import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { pl } from './pl';

type Tree =
  | string
  | {
      [K: string]: Tree | string;
    };

type ExtractTranslationKeys<
  TranslationJson extends Tree,
  Keys extends keyof TranslationJson = keyof TranslationJson,
  Prefix extends string = '',
  Result extends string = ''
> = TranslationJson extends string
  ? `${Prefix}`
  : Keys extends infer Key extends keyof TranslationJson
  ? TranslationJson[Key] extends string
    ? ExtractTranslationKeys<
        TranslationJson[Key],
        never,
        `${Prefix extends '' ? '' : `${Prefix}.`}${Key extends string ? Key : 3}`,
        Result
      >
    : TranslationJson[Key] extends Tree
    ? ExtractTranslationKeys<
        TranslationJson[Key],
        keyof TranslationJson[Key],
        `${Prefix extends '' ? '' : `${Prefix}.`}${Key extends string ? Key : 3}`,
        Result
      >
    : 1
  : 2;

type ReplaceString<
  Str extends string,
  StringToReplace extends string,
  NewString extends string
> = Str extends `${StringToReplace}${infer Rest extends string}` ? `${NewString}${Rest}` : never;

type TranslationKeys = ExtractTranslationKeys<typeof pl>;
export type UnprefixedTranslationKeys = ReplaceString<TranslationKeys, 'translation.', ''>;

export const useTypedTranslation = () => {
  const { t } = useTranslation();

  return useCallback((key: UnprefixedTranslationKeys) => t(key), [t]);
};
