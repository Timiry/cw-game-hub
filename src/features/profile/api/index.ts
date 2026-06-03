import accountsEndpoints from "@/shared/config/endpoints/accounts";
import api from "@/shared/api";

// Импортируем типы, сгенерированные из спецификации
import type {
  GetProfileResponse,
  UpdateProfileResponse,
  UpdateUserProfileRequest,
  UploadPhotoResponse,
  PageDtoBackgroundResponse,
  SelectBackgroundRequest,
  BackgroundImageResponse,
  PageDtoGiftResponse,
  UpdateGiftRequest,
  GiftResponse,
} from "@/entities/profile/model";

const API_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL;

class ProfileService {
  /**
   * Получить профиль текущего пользователя
   */
  static async getCurrentUserProfile() {
    return api.get<GetProfileResponse>(
      API_URL + accountsEndpoints.profile.current
    );
  }

  /**
   * Получить профиль пользователя по ID
   */
  static async getUserProfileById(userId: number) {
    const url = API_URL + accountsEndpoints.profile.byId(userId);
    return api.get<GetProfileResponse>(url);
  }

  /**
   * Редактировать профиль пользователя
   */
  static async updateUserProfile(body: UpdateUserProfileRequest) {
    return api.patch<UpdateProfileResponse>(
      API_URL + accountsEndpoints.profile.edit,
      body
    );
  }

  /**
   * Загрузить/обновить фото профиля
   */
  static async uploadProfilePhoto(file: File) {
    const formData = new FormData();
    // Имя поля 'photo' строго соответствует спецификации
    formData.append("photo", file);

    return api.post<UploadPhotoResponse>(
      API_URL + accountsEndpoints.profile.photo,
      formData
    );
  }

  /**
   * Получить пагинированный список доступных фонов
   */
  static async getBackgroundImages(size: number = 10, page: number = 0) {
    const searchParams = new URLSearchParams({
      size: size.toString(),
      page: page.toString(),
    });
    return api.get<PageDtoBackgroundResponse>(
      API_URL + accountsEndpoints.profile.background + "?" + searchParams
    );
  }

  /**
   * Выбрать фоновое изображение
   */
  static async selectBackgroundImage(body: SelectBackgroundRequest) {
    return api.post<BackgroundImageResponse>(
      API_URL + accountsEndpoints.profile.background,
      body
    );
  }

  /**
   * Получить пагинированный список всех подарков профиля (текущего пользователя)
   */
  static async getProfileGifts(size: number = 10, page: number = 0) {
    const searchParams = new URLSearchParams({
      size: size.toString(),
      page: page.toString(),
    });
    return api.get<PageDtoGiftResponse>(
      API_URL + accountsEndpoints.profile.gifts + "?" + searchParams
    );
  }

  /**
   * Обновить подарок (скрыть/изменить порядок)
   */
  static async updateProfileGift(body: UpdateGiftRequest) {
    return api.patch<GiftResponse>(
      API_URL + accountsEndpoints.profile.gifts,
      body
    );
  }

  /**
   * Получить пагинированный список подарков профиля другого пользователя по ID
   */
  static async getProfileGiftsByUserId(
    userId: number,
    size: number = 10,
    page: number = 0
  ) {
    const searchParams = new URLSearchParams({
      size: size.toString(),
      page: page.toString(),
    });
    const url = API_URL + accountsEndpoints.profile.giftsByUser(userId);
    return api.get<PageDtoGiftResponse>(url + "?" + searchParams);
  }
}

export default ProfileService;
