import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ children, footer, ...props }) {
  console.log({footer})
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h2 className="block text-center text-2xl font-bold my-8">
					Customization
				</h2>
			</SidebarHeader>
			<SidebarContent>{children}</SidebarContent>
			<SidebarFooter>
				<div className="p-1">{footer}</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
