import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from "@faker-js/faker";

import { formatRevenue } from '../../util/format/revenue';
import { labels } from '../../data/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Revenue Chart',
    },
  },
};

interface ChartRevenueProps {
  revenues: any;
  type: string;
  byYear: number;
}

const ChartRevenue: React.FC<ChartRevenueProps> = ({ revenues, type, byYear }) => {
  const labelYear = [];
  for (const key in revenues) {
    labelYear.push(key);
  }
  const fields = type === 'year' ? labelYear : labels
  const data = {
    fields,
    datasets: [
      // {
      //   label: "Revenue (2024)",
      //   data: revenues,
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
      {
        label: `Revenue (${type === "year" ? "yearly" : 'monthly'}) đ`,
        data: type === "year" ? revenues : formatRevenue(revenues),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  
  if (Object.keys(revenues).length === 0) {
    return <div className="text-neutral-200 text-center my-8">Not found data</div>;
  }
    return (
      <div>
        <Bar options={options} data={data} />
      </div>
    );
};

export default ChartRevenue;
