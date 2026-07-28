import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './SocialIcons.css';

const iconMap = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

const defaultLinks = [
  { platform: 'facebook', url: '#' },
  { platform: 'twitter', url: '#' },
  { platform: 'instagram', url: '#' },
  { platform: 'linkedin', url: '#' },
  { platform: 'youtube', url: '#' },
];

function SocialIcons({ links = defaultLinks, size = 16, variant = 'default' }) {
  return (
    <div className={`socialicons socialicons--${variant}`}>
      {links.map(({ platform, url }) => {
        const Icon = iconMap[platform];
        if (!Icon) return null;
        return (
          <a
            key={platform}
            href={url}
            aria-label={platform}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}

export default SocialIcons;
