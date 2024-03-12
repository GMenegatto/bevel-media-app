export enum Platform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  TIKTOK = 'Tiktok',
  WHATSAPP = 'WhatsApp',
  PINTEREST = 'Pinterest',
  LINKEDIN = 'Linkedin',
  GOOGLE = 'Google',
  YOUTUBE = 'Youtube',
  EMAIL = 'Email',
  BLOG = 'Blogger'
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
  if (value === Platform.TIKTOK) {
    return 'tiktok'
  }
  if (value === Platform.LINKEDIN) {
    return 'linkedin'
  }
  if (value === Platform.PINTEREST) {
    return 'pinterest'
  }
  if (value === Platform.WHATSAPP) {
    return 'whatsapp'
  }
  if (value === Platform.GOOGLE) {
    return 'google'
  }
  if (value === Platform.BLOG) {
    return 'blogger'
  }
  if (value === Platform.EMAIL) {
    return 'envelope'
  }

  return '';
}

export function getIconFamily(value: Platform): string  {

  if (value === Platform.EMAIL) {
    return 'fas'
  }

  return 'fab';
}

export const allPlatforms = () => Object.values(Platform);
