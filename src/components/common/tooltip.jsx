import {
	TooltipContent,
	TooltipProvider,
	Tooltip as TooltipShadcn,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export const Tooltip = ({ children, content }) => {
	return (
		<TooltipProvider>
			<TooltipShadcn>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</TooltipShadcn>
		</TooltipProvider>
	);
};
