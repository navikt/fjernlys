import { VStack } from "@navikt/ds-react";

interface VstackProps {
  gap?: string;
  align?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const VstackComp = ({
  gap = "4",
  align = "start",
  style,
  children,
}: VstackProps) => {
  return (
    <VStack gap={gap} align={align} style={style}>
      {children}
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </VStack>
  );
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};

export default VstackComp;
