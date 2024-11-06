import styled from 'styled-components';

interface ProgressBarProps {
  progress: number; // percentage (0 - 100)
  height?: number;  // optional height of the progress bar
  color?: string;   // optional color for the progress indicator
  backgroundColor?: string; // optional background color of the bar
}

export default (props: ProgressBarProps) => {
  const { progress, height = 10, color = 'blue', backgroundColor = '#e0e0de'} = props;
  const clampProgress = Math.min(100, Math.max(0, progress)); // limit progress to 0 - 100

  return (
    <Outer
      $backgroundColor={backgroundColor}
      $height={height}
      style={{
        width: '100%',
        display: 'flex',
        backgroundColor: backgroundColor,
        borderRadius: height / 2,
        overflow: 'hidden',
        height: 3,
      }}
    >
      <Inner
        $clampProgress={clampProgress}
        $color={color}
        $height={height}
        style={{
          height: '100%',
          width: `${clampProgress}%`,
          backgroundColor: color,
          transition: 'width 0.3s ease',
          borderRadius: 'inherit',
          textAlign: 'center',
          color: '#fff',
          fontSize: height * 0.6,
        }}
      >
      </Inner>
    </Outer>
  );
};

const Outer = styled.div<{$backgroundColor: string; $height: number;}>`
  width: '100%';
  backgroundColor: ${props => props.$backgroundColor};
  borderRadius: ${props => props.$height}/ 2;
  overflow: 'hidden';
  height: 3;
`;

const Inner = styled.div<{ $clampProgress?: number; $color: string; $height: number; }>`
  height: '100%';
  width: ${props => props.$clampProgress}%;
  backgroundColor: ${props => props.$color};
  transition: 'width 0.3s ease';
  borderRadius: 'inherit';
  textAlign: 'center';
  color: '#fff';
  fontSize: ${props => props.$height} * 0.6;
`;