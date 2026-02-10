import enMessages from "../messages/en.json";
import zhMessages from "../messages/zh.json";

type TranslationMessages = typeof enMessages;
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${string & K}.${NestedKeyOf<T[K]>}`
        : string & K;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationMessages>;

const messages = {
  en: enMessages,
  zh: zhMessages,
} as const;

/**
 * 获取翻译文本的工具函数
 * @param locale - 语言代码 ('en' | 'zh')
 * @param key - 翻译键，支持嵌套路径如 'Charts.dailyTraffic'
 * @returns 翻译后的文本
 */
export function getTranslation(
  locale: "en" | "zh" = "zh",
  key: string,
): string {
  const keys = key.split(".");
  let value: any = messages[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return typeof value === "string" ? value : key;
}

/**
 * 创建一个绑定了语言的翻译函数
 * @param locale - 语言代码
 * @returns 翻译函数
 */
export function createTranslator(locale: "en" | "zh" = "zh") {
  return (key: string) => getTranslation(locale, key);
}

// 默认中文翻译函数
export const t = (key: string) => getTranslation("zh", key);
