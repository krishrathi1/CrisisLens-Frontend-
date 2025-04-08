"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XAxis, CartesianGrid, LineChart, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Disaster } from "@/types/disaster";
import { compareAsc, format } from "date-fns";
import { useMemo } from "react";

const chartConfig: ChartConfig = {
  total: {
    label: "Total Disasters",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

interface ChartsProps {
  disasters: Disaster[];
}

interface GroupedDisasterType {
  [date: string]: {
    [disasterType: string]: number;
  };
}

export function Charts({ disasters }: ChartsProps) {
  const chartData = useMemo(() => {
    const groupedData = disasters
      .sort((a, b) => compareAsc(a.timestamp, b.timestamp))
      .reduce((acc: GroupedDisasterType, item) => {
        const monthYear = format(item.timestamp, "MMM");
        if (!acc[monthYear]) {
          acc[monthYear] = {};
        }
        acc[monthYear][item.disasterType] =
          (acc[monthYear][item.disasterType] || 0) + 1;
        acc[monthYear]["total"] = (acc[monthYear]["total"] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(groupedData)
      .map(([date, types]) => ({
        date,
        ...types,
      }))
      .sort((a, b) => compareAsc(a.date, b.date));
  }, [disasters]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Disasters Over Time</CardTitle>
          <CardDescription>
            Showing total number of disasters recorded till date{" "}
          </CardDescription>
        </div>

        <div className="flex items-end justify-end">
          <div className="relative z-30 flex flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {disasters.length.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-[150px]" nameKey="total" />
              }
            />

            <Line
              dataKey="total"
              type="monotone"
              stroke={"var(--color-desktop)"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
