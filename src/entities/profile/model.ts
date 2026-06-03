/**
 * Типы местоимений пользователя
 */
export enum PronounsEnum {
  "he",
  "she",
}

/**
 * Контактные данные пользователя
 */
export interface Contacts {
  /** Тип связи */
  type: "vk" | "telegram";
  /** Ссылка, валидируется домен с соответствующим типом, например t.me/... или vk.ru/... */
  link: string;
}

/**
 * Информация о посещённом мире
 */
export interface World {
  /** Название мира */
  name: string;
  /** Ссылка на мир */
  url: string;
}

/**
 * Информация о подарке
 */
export interface Gift {
  /** ID отправителя подарка */
  senderId: number;
  /** Имя отправителя подарка */
  senderName: string;
  /** ID подарка */
  giftId: number;
  /** Ссылка на изображение подарка */
  imageUrl: string;
  /** Текст к подарку */
  text: string;
  /** Скрыт ли подарок от отображения */
  hidden: boolean;
}

/**
 * Основные данные профиля пользователя
 */
export interface UserProfile {
  /** Уникальный идентификатор пользователя */
  id: number;
  /** Имя пользователя */
  name: string;
  /** Цитата пользователя */
  quote?: string;
  /** Ссылка на фото профиля */
  photo?: string;
  /** Ссылка на фоновое изображение */
  background?: string;
  /** ID выбранного фона */
  backgroundId?: number;
  /** Основной подарок (первый) в профиле */
  primaryGift: Gift | null;
  /** Второй подарок в профиле */
  secondaryGift: Gift | null;
  /** Третий подарок в профиле */
  tertiaryGift: Gift | null;
  /** Местоимения пользователя */
  pronouns?: PronounsEnum;
  /** Контакты пользователя (максимум 4 элемента) */
  contacts?: Contacts[];
  /** Список посещённых миров */
  visitedWorlds: World[];
  /** Скрыт ли список посещённых миров от других пользователей */
  visitedWorldsHidden: boolean;
  /** Время регистрации пользователя */
  registrationTime: string; // format: date-time
  /** Время последней активности пользователя */
  lastActivityTime: string; // format: date-time
  /** Информация о пользователе */
  aboutMe?: string;
}

/**
 * Данные фонового изображения
 */
export interface BackgroundImage {
  /** Уникальный идентификатор фона */
  id: number;
  /** Ссылка на изображение фона */
  url: string;
}

// ==========================================
// ПАГИНАЦИЯ (PageDto)
// Для удобства в TS лучше использовать дженерики,
// но здесь приведены строгие интерфейсы по спецификации
// ==========================================

/**
 * Базовая структура пагинированного ответа
 */
export interface PageDto<T> {
  /** Список элементов на странице */
  content: T[];
  /** Общее количество страниц */
  totalPages: number;
}

/**
 * Пагинированный список подарков
 */
export interface PageDtoGift extends PageDto<Gift> {
  content: Gift[];
}

/**
 * Пагинированный список фонов
 */
export interface PageDtoBackground extends PageDto<BackgroundImage> {
  content: BackgroundImage[];
}

// ==========================================
// ОБЁРТКИ ОТВЕТОВ (Responses)
// ==========================================

export interface GetProfileResponse {
  data: UserProfile;
}

export interface UpdateProfileResponse {
  data: UserProfile;
}

export interface UploadPhotoResponse {
  data: { photo: string };
}

export interface BackgroundImageResponse {
  data: BackgroundImage;
}

export interface PageDtoGiftResponse {
  data: PageDtoGift;
}

export interface PageDtoBackgroundResponse {
  data: PageDtoBackground;
}

export interface GiftResponse {
  data: Gift;
}

// ==========================================
// ЗАПРОСЫ (Requests)
// ==========================================

/**
 * Данные для обновления профиля пользователя
 */
export interface UpdateUserProfileRequest {
  /** Новое имя пользователя */
  name: string;
  /** Новая цитата пользователя */
  quote?: string;
  /** Новые местоимения */
  pronouns?: PronounsEnum;
  /** Новые контакты пользователя (максимум 4 элемента) */
  contacts: Contacts[];
  /** Новая информация о пользователе */
  aboutMe?: string;
  /** Скрыть список посещённых миров от других пользователей */
  visitedWorldsHidden: boolean;
  /** ID первого подарка в профиле */
  primaryGiftId: number | null;
  /** ID второго подарка в профиле */
  secondaryGiftId: number | null;
  /** ID третьего подарка в профиле */
  tertiaryGiftId: number | null;
}

export interface SelectBackgroundRequest {
  /** ID выбранного фона */
  backgroundId: number;
}

export interface UpdateGiftRequest {
  /** ID подарка */
  giftId: number;
  /** Скрыть подарок */
  hidden: boolean;
}
