import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        'AI Agent Systems Builder',
        2000,
        'Full Stack Developer',
        2000,
        'Oracle APEX Developer',
        2000,
        'Knowledge Graph Engineer',
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-xl md:text-2xl text-black/70 dark:text-white/70 font-medium"
    />
  );
};

export default TypingAnimation;
