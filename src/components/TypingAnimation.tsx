import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        'Data Scientist',
        2000,
        'AI/ML Engineer',
        2000,
        'Machine Learning Expert',
        2000,
        'Data Analyst',
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-xl md:text-2xl text-black/70 font-medium"
    />
  );
};

export default TypingAnimation;
