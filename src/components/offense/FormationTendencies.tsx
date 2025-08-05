import React from "react";

interface FormationData {
  formation: string;
  run: number;
  pass: number;
  topPlays: string[];
}

interface Props {
  data: FormationData[];
}

const FormationTendencies: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">Formation</th>
            <th className="p-2 text-right">Run %</th>
            <th className="p-2 text-right">Pass %</th>
            <th className="p-2">Top Plays</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ formation, run, pass, topPlays }) => (
            <tr key={formation} className="border-t">
              <td className="p-2">{formation}</td>
              <td className="p-2 text-right">{run}%</td>
              <td className="p-2 text-right">{pass}%</td>
              <td className="p-2">{topPlays.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;
