import { ResponsivePie } from "@nivo/pie";

const PieChartSmall = ({ value, valueName, sumValue, secondLabel }) => {
  const secondValue = sumValue - value;
  const data = [
    {
      id: valueName,
      label: valueName,
      value: value,
      color: "#f9fbfc",
    },
    {
      id: secondLabel,
      label: secondLabel,
      value: secondValue,
      color: "#182533",
    },
  ];
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
    />
  );
};

export default PieChartSmall;
