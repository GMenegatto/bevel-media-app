export enum Platform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  YOUTUBE = 'Youtube'
}

export default function getIconFromPlatform(value: Platform): string  {
  if (value === Platform.INSTAGRAM) {
    return 'instagram'
  }
  if (value === Platform.FACEBOOK) {
    return 'facebook'
  }
  if (value === Platform.YOUTUBE) {
    return 'youtube'
  }

  return '';
}
