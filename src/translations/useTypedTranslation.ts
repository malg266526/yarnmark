import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import type { i18n as I18n } from 'i18next';
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

type TranslationOptions = Record<string, unknown>;

type TypedTranslationFunction = ((key: UnprefixedTranslationKeys, options?: TranslationOptions) => string) & {
  i18n: I18n;
};

export const useTypedTranslation = (): TypedTranslationFunction => {
  const { t, i18n } = useTranslation();

  const translate = useCallback(
    (key: UnprefixedTranslationKeys, options?: TranslationOptions) => t(key, options as never) as unknown as string,
    [t]
  );

  return useMemo(() => Object.assign(translate, { i18n }), [translate, i18n]);
};
