import { PronounsEnum } from "@/entities/profile/model";

export const pronounsToText = (pronoun: PronounsEnum | null) => {
  switch (pronoun) {
    case PronounsEnum.he:
      return "he/him";
    case PronounsEnum.she:
      return "she/her";
    case PronounsEnum.they:
      return "they/them";
    case PronounsEnum.other:
      return "other/ask";
    default:
      return "prefer not to say";
  }
};

const pronounsLabels: Record<PronounsEnum, string> = {
  [PronounsEnum.he]: "he/him",
  [PronounsEnum.she]: "she/her",
  [PronounsEnum.they]: "they/them",
  [PronounsEnum.other]: "other/ask",
};

export const getPronounLabel = (pronoun: PronounsEnum | null): string => {
  if (pronoun === null) {
    return "prefer not to say";
  }
  return pronounsLabels[pronoun];
};
