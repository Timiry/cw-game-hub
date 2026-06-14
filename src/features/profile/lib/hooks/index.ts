import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ProfileService from "@/features/profile/api";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";
import type {
  UpdateUserProfileRequest,
  SelectBackgroundRequest,
  UpdateGiftRequest,
} from "@/entities/profile/model";

// ==========================================
// QUERIES
// ==========================================

export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: [QueryKeys.UserProfile],
    queryFn: ProfileService.getCurrentUserProfile,
    select: (response) => response.data,
  });
};

export const useUserProfileById = (userId: number) => {
  return useQuery({
    queryKey: [QueryKeys.UserProfile, userId],
    queryFn: () => ProfileService.getUserProfileById(userId),
    select: (response) => response.data,
  });
};

export const useBackgroundImages = (
  size?: number,
  page?: number,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [QueryKeys.Backgrounds, size, page],
    queryFn: enabled
      ? () => ProfileService.getBackgroundImages(size, page)
      : skipToken,
    select: (response) => response.data,
  });
};

export const useCurrentUserGifts = (size?: number, page?: number) => {
  return useQuery({
    queryKey: [QueryKeys.Gifts, size, page],
    queryFn: () => ProfileService.getProfileGifts(size, page),
    select: (response) => response.data,
  });
};

export const useUserGiftsById = (
  userId: number,
  size?: number,
  page?: number
) => {
  return useQuery({
    queryKey: [QueryKeys.Gifts, userId, size, page],
    queryFn: () => ProfileService.getProfileGiftsByUserId(userId, size, page),
    select: (response) => response.data,
  });
};

export const useProfileGiftsList = (
  isProfileMine: boolean,
  userId: number,
  size?: number,
  page?: number,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [QueryKeys.Gifts, isProfileMine, userId, size, page],
    queryFn: enabled
      ? () =>
          isProfileMine
            ? ProfileService.getProfileGifts(size, page)
            : ProfileService.getProfileGiftsByUserId(userId, size, page)
      : skipToken,
    select: (res) => res.data,
  });
};

// ==========================================
// MUTATIONS
// ==========================================

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateUserProfileRequest) =>
      ProfileService.updateUserProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    },
  });
};

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => ProfileService.uploadProfilePhoto(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    },
  });
};

export const useSelectBackground = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SelectBackgroundRequest) =>
      ProfileService.selectBackgroundImage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    },
  });
};

export const useUpdateGift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateGiftRequest) =>
      ProfileService.updateProfileGift(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Gifts] });
    },
  });
};
