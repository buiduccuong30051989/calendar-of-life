import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import BlurIn from '@/components/ui/blur-in';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import RetroGrid from '@/components/ui/retro-grid';
import AnimatedGridPattern from './ui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { getRandomItem } from '@/utils/helpers';
import { APP_CONFIG, HEADING_QUOTES, DATE_FIELDS, TEXTS } from '@/constants';

// Background components configuration
const BACKGROUNDS = {
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

// Heading components for display
const HEADING_COMPONENTS = {
	1: (
		<p className="text-5xl font-bold max-w-[992px]">
			{HEADING_QUOTES.QUOTE_1.text.split(', ')[0]},
			<br />
			{HEADING_QUOTES.QUOTE_1.text.split(', ')[1]}
		</p>
	),
	2: (
		<p className="text-5xl font-bold max-w-[992px]">
			{HEADING_QUOTES.QUOTE_2.text.split(', ')[0]},
			<br />
			{HEADING_QUOTES.QUOTE_2.text.split(', ')[1]}
		</p>
	),
	3: (
		<p className="text-5xl font-bold max-w-[992px]">
			{HEADING_QUOTES.QUOTE_3.text.split(', ')[0]},
			<br />
			{HEADING_QUOTES.QUOTE_3.text.split(', ')[1]}
		</p>
	),
};

/**
 * FormDate component for selecting birth and death dates
 * @param {Object} props
 * @param {Function} props.handleChange - Handler for date changes
 * @param {Object} props.dates - Current date values
 */
export const FormDate = ({ handleChange, dates }) => {
	const [heading, setHeading] = useState(() => getRandomItem(HEADING_COMPONENTS));
	const randomBackground = useMemo(() => getRandomItem(BACKGROUNDS), []);

	useEffect(() => {
		const interval = setInterval(() => {
			setHeading(getRandomItem(HEADING_COMPONENTS));
		}, APP_CONFIG.HEADING_ROTATION_INTERVAL);

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
										<span>{TEXTS.EN.DATE_OF_BIRTH}</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={dates.dateOfBirth}
									onSelect={(date) =>
										handleChange({ id: DATE_FIELDS.DATE_OF_BIRTH, value: date })
									}
									initialFocus
									captionLayout="dropdown-buttons"
									fromYear={APP_CONFIG.DEFAULT_FROM_YEAR}
									toYear={APP_CONFIG.DEFAULT_TO_YEAR}
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
										<span>{TEXTS.EN.DATE_OF_DEATH}</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={dates.dateOfDie}
									onSelect={(date) =>
										handleChange({ id: DATE_FIELDS.DATE_OF_DIE, value: date })
									}
									initialFocus
									captionLayout="dropdown-buttons"
									fromYear={APP_CONFIG.DEFAULT_FROM_YEAR}
									toYear={APP_CONFIG.DEFAULT_TO_YEAR}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
			<footer className="fixed bottom-0 left-0 w-full p-4">
				<h3>{TEXTS.EN.MEMENTO_MORI}</h3>
			</footer>
			{randomBackground}
		</div>
	);
};

FormDate.propTypes = {
	handleChange: PropTypes.func.isRequired,
	dates: PropTypes.shape({
		dateOfBirth: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		dateOfDie: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	}).isRequired,
};
