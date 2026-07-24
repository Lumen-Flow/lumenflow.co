import { DecryptedText } from "@/components/ui/decrypted-text";

type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
};

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <DecryptedText
      text={text}
      speed={Math.max(24, speed * 7)}
      sequential
      revealDirection="start"
      animateOn="view"
      className="text-cool-frost"
      encryptedClassName="text-volt-time/70"
      parentClassName={className}
    />
  );
}
