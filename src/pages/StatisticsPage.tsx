"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip
} from "recharts";
import { 
  AlertTriangle, 
  Download, 
  TrendingUp, 
  Users, 
  Map, 
  Calendar 
} from "lucide-react";
import { data } from "@/data/dummy";
import { format } from "date-fns";
import { Disaster } from "@/types/disaster";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getDisasterIcon } from "@/utils/disastericonmapping";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

const GRADIENT_COLORS = {
  start: 'from-blue-500',
  middle: 'via-purple-500',
  end: 'to-pink-500'
};

const AnimatedStatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendColor 
}: { 
  title: string, 
  value: string, 
  icon: React.ElementType, 
  trend?: string,
  trendColor?: string
}) => (
  <Card className={`
    bg-gradient-to-br ${GRADIENT_COLORS.start} ${GRADIENT_COLORS.middle} ${GRADIENT_COLORS.end} 
    text-white transition-all duration-300 hover:scale-105 hover:shadow-xl
  `}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
      <Icon className="h-5 w-5 text-white/70" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`text-xs flex items-center ${trendColor}`}>
          <TrendingUp className="mr-1 h-3 w-3" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

const chartConfig: ChartConfig = {
  disasters: {
    label: "Disaster Frequency",
    color: "hsl(var(--primary))",
  },
};

function getDisasterTypesWithFrequency(data: Disaster[]) {
  const disasterTypeFrequency = data.reduce((acc, event) => {
    acc[event.disasterType] = (acc[event.disasterType] || 0) + 1;
    return acc;
  }, {});

  const frequencies = Object.keys(disasterTypeFrequency).map((disasterType, idx) => ({
    name: disasterType,
    frequency: disasterTypeFrequency[disasterType],
  }));

  const mostFrequent = frequencies.reduce((max, current) => 
    current.frequency > max.frequency ? current : max
  );

  return { frequencies, mostFrequent };
}

function getDisastersByYear(data: Disaster[]) {
  const disasterByYear = data.reduce((acc, event) => {
    const year = format(event.timestamp, "yyyy");
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(disasterByYear).map((year) => ({
    year,
    count: disasterByYear[year],
  }));
}

function EnhancedStatisticsPage() {
  const disasters = data;
  const { frequencies, mostFrequent } = getDisasterTypesWithFrequency(data);
  const mostFrequentPercentage = ((mostFrequent.frequency / data.length) * 100).toFixed(1);
  const disastersByYear = getDisastersByYear(data);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Disaster Insights
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive overview of disaster events in India
            </p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Export Report <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatedStatCard 
            title="Total Disasters" 
            value={disasters.length.toString()} 
            icon={AlertTriangle}
            trend="+12% from last month"
            trendColor="text-green-400"
          />
          <AnimatedStatCard 
            title="Affected People" 
            value="24,422" 
            icon={Users}
            trend="+8% from last quarter"
            trendColor="text-yellow-400"
          />
          <AnimatedStatCard 
            title="Most Recent" 
            value={disasters[1].disasterType} 
            icon={Calendar}
            trend={format(disasters[1].timestamp, "dd/MM/yyyy")}
          />
          <AnimatedStatCard 
            title="Most Common Type" 
            value={mostFrequent.name} 
            icon={Map}
            trend={`${mostFrequentPercentage}% of disasters`}
            trendColor="text-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Disasters Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="aspect-video w-full"
              >
                <AreaChart
                  data={disastersByYear}
                  margin={{ left: 12, right: 12, top: 20, bottom: 12 }}
                >
                  <defs>
                    <linearGradient id="disasterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    className="text-gray-600"
                  />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.1)' }} 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#disasterGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Disasters by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="aspect-video w-full"
              >
                <PieChart>
                  <defs>
                    {frequencies.map((entry, index) => (
                      <linearGradient 
                        key={`gradient-${index}`} 
                        id={`pieGradient-${index}`} 
                        x1="0%" 
                        y1="0%" 
                        x2="100%" 
                        y2="100%"
                      >
                        <stop 
                          offset="0%" 
                          stopColor={`hsl(${index * 60}, 70%, 60%)`} 
                          stopOpacity={0.8}
                        />
                        <stop 
                          offset="100%" 
                          stopColor={`hsl(${index * 60}, 70%, 40%)`} 
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Pie 
                    data={frequencies} 
                    dataKey="frequency" 
                    nameKey="name"
                    fill="#8884d8"
                    innerRadius="40%" 
                    outerRadius="70%"
                    paddingAngle={5}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {frequencies.map((entry, index) => (
                      <Pie
                        key={`pie-${index}`}
                        fill={`url(#pieGradient-${index})`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Recent Disaster Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disasters.slice(0, 10).map((disaster, index) => (
                <div key={disaster._id}>
                  <div className="flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer group">
                    <img
                      className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
                      src={getDisasterIcon(disaster.disasterType?.toLowerCase())}
                      alt="Disaster Icon"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {disaster.disasterType} in {disaster.location}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {format(disaster.timestamp, "dd/MM/yyyy")}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Impact: {disaster.affectedPeople} people affected
                      </p>
                    </div>
                  </div>
                  {index < disasters.slice(0, 10).length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EnhancedStatisticsPage;