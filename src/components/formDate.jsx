import BlurIn from "@/components/ui/blur-in";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import RetroGrid from "@/components/ui/retro-grid";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useEffect, useState } from "react";
import AnimatedGridPattern from "./ui/animated-grid-pattern";

const getRandom = (randomData) => {
	if (Array.isArray(randomData)) {
		const randomIndex = Math.floor(Math.random() * randomData.length);
		return randomData[randomIndex];
	}

	if (typeof randomData === "object" && randomData !== null) {
		const keys = Object.keys(randomData);
		const randomIndex = Math.floor(Math.random() * keys.length);
		return randomData[keys[randomIndex]];
	}

	throw new Error("Invalid data type. Expected an array or an object.");
};

const BACKGROUND = {
	1: <RetroGrid angle={18} />,
	2: (
		<AnimatedGridPattern
			numSquares={30}
			maxOpacity={0.1}
			duration={3}
			repeatDelay={1}
		/>
	),
};

const HEADING_DATA = {
	1: (
		<p className="text-5xl font-bold max-w-[992px]">
			By acknowledging the inevitability of death,
			<br />
			become obsessed with life.
		</p>
	),
	2: (
		<p className="text-5xl font-bold max-w-[992px]">
			We have two lives,
			<br />
			and the second begins when we realize we only have one.
		</p>
	),
	3: (
		<p className="text-5xl font-bold max-w-[992px]">
			This is your life,
			<br />
			and its ending one minute at a time.
		</p>
	),
};

const randomBackground = getRandom(BACKGROUND);

export const FormDate = ({ handleChange, dates }) => {
	const [heading, setHeading] = useState(() => getRandom(HEADING_DATA));

	useEffect(() => {
		const interval = setInterval(() => {
			setHeading(getRandom(HEADING_DATA));
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container w-full text-center mx-auto p-4 flex items-center justify-center h-screen">
			<div>
				<BlurIn word={heading} />
				<div className="grid grid-cols-2 gap-4 mt-16 max-w-[480px] mx-auto">
					<div>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[240px] justify-start text-left font-normal",
										!dates.dateOfBirth && "text-muted-foreground",
									)}
								>
									<CalendarIcon />
									{dates.dateOfBirth ? (
										format(dates.dateOfBirth, "PPP")
									) : (
										<span>Date of birth</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={dates.dateOfBirth}
									onSelect={(date) =>
										handleChange({ id: "dateOfBirth", value: date })
									}
									initialFocus
									captionLayout="dropdown-buttons"
									fromYear={1960}
									toYear={2030}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[240px] justify-start text-left font-normal",
										!dates.dateOfDie && "text-muted-foreground",
									)}
								>
									<CalendarIcon />
									{dates.dateOfDie ? (
										format(dates.dateOfDie, "PPP")
									) : (
										<span>Date of Dead</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={dates.dateOfDie}
									onSelect={(date) =>
										handleChange({ id: "dateOfDie", value: date })
									}
									initialFocus
									captionLayout="dropdown-buttons"
									fromYear={1960}
									toYear={2030}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
			<footer className="fixed bottom-0 left-0 w-full p-4">
				<h3>~ Memento mori ~</h3>
			</footer>
			{randomBackground}
		</div>
	);
};
