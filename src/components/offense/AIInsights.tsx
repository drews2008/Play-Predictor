type DashboardData = {
  overall: {
    total: number;
    runPct: number;
    passPct: number;
    avgYards: number;
  };
  formations: Record<string, any>;
  situations: Record<string, any>;
  concepts: Record<string, any>;
};

type Insight = {
  title: string;
  detail: string;
};

type Props = {
  data: DashboardData;
};

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatYards(value: number) {
  return `${value.toFixed(1)} yds`;
}

export default function AIInsights({ data }: Props) {
  const { overall, formations, situations, concepts } = data;

  const formationEntries = Object.entries(formations);
  const situationEntries = Object.entries(situations);
  const conceptEntries = Object.entries(concepts);

  const bestFormation = formationEntries
    .filter(([, formation]: any) => formation.total >= 3)
    .sort((a: any, b: any) => b[1].avgYards - a[1].avgYards)[0];

  const bestSituation = situationEntries
    .filter(([, situation]: any) => situation.total >= 3)
    .sort((a: any, b: any) => b[1].avgYards - a[1].avgYards)[0];

  const topConcept = conceptEntries
    .filter(([, concept]: any) => concept.total >= 2)
    .sort((a: any, b: any) => b[1].total - a[1].total)[0];

  const insights: Insight[] = [];

  insights.push({
    title: "Run/Pass tendency",
    detail:
      overall.runPct >= overall.passPct
        ? `You lean run-heavy (${formatPercent(overall.runPct)} run). Consider complementary play-action in expected run situations.`
        : `You lean pass-heavy (${formatPercent(overall.passPct)} pass). Consider adding constraint runs to keep defenses honest.`,
  });

  if (bestFormation) {
    insights.push({
      title: "Best formation efficiency",
      detail: `${bestFormation[0]} is your most efficient high-usage formation at ${formatYards(
        bestFormation[1].avgYards,
      )} per play.`,
    });
  }

  if (bestSituation) {
    insights.push({
      title: "Best situation output",
      detail: `${bestSituation[0]} is producing ${formatYards(
        bestSituation[1].avgYards,
      )} on average. This is a good place to script your first call.`,
    });
  }

  if (topConcept) {
    insights.push({
      title: "Most used concept",
      detail: `${topConcept[0]} appears ${topConcept[1].total} times. Validate tendency breaker calls off this look.`,
    });
  }

  insights.push({
    title: "Overall efficiency",
    detail: `Your offense is averaging ${formatYards(overall.avgYards)} per play over ${overall.total} snaps.`,
  });

  return (
    <section className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-blue-900">AI Insights</h3>
        <span className="rounded-full border border-blue-300 bg-white px-2 py-1 text-xs font-medium text-blue-700">
          Auto-generated
        </span>
      </div>

      <ul className="space-y-2">
        {insights.map((insight) => (
          <li key={insight.title} className="rounded-lg border border-blue-100 bg-white p-3">
            <p className="text-sm font-semibold text-blue-900">{insight.title}</p>
            <p className="mt-1 text-sm text-blue-800/90">{insight.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
