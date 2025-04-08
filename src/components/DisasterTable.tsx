"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { Disaster } from "@/types/disaster";
import Link from "next/link";
import { DateRange } from "react-day-picker";

interface DisasterTableProps {
  disasters: Disaster[];
}

export function DisasterTable({ disasters }: DisasterTableProps) {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: null!,
    to: null!,
  });
  const disasterTypes = [
    ...new Set(disasters.map((item) => item.disasterType)),
  ];

  const filteredDisasters = useMemo(() => {
    return disasters.filter(
      (disaster) =>
        (filter === "all" ||
          disaster.disasterType.replace(" ", "").toLowerCase() === filter) &&
        (!dateRange?.from || new Date(disaster.timestamp) >= dateRange.from) &&
        (!dateRange?.to || new Date(disaster.timestamp) <= dateRange.to)
    );
  }, [filter, dateRange]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disaster Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/3">
            <Label htmlFor="type">Disaster Type</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {disasterTypes.map((type, idx) => (
                  <SelectItem
                    value={type.replace(" ", "").toLowerCase()}
                    key={idx}
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/3">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from || new Date()}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDisasters.map((disaster, idx) => (
              <TableRow key={idx}>
                <TableCell>{disaster.disasterType}</TableCell>
                <TableCell>{disaster.location}</TableCell>
                <TableCell>
                  {format(disaster.timestamp, "EEEE, d MMM yyyy")}
                </TableCell>
                <TableCell>
                  <Link href={disaster.postLink} className="w-fit">
                    <Badge variant='secondary'>
                      Visit
                      <ExternalLink className="size-3 ml-2" />
                    </Badge>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
