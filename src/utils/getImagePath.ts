import { MBTIType } from '@/types/test';

export const getCharacterImagePathByMbtiType = (type: MBTIType): string => {
  return `/img/characters/${type.toLowerCase()}.png`;
};
