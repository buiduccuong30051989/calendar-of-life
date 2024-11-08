import BlurIn from "@/components/ui/blur-in";
import RetroGrid from "@/components/ui/retro-grid";

export const FormDate = ({ handleChange, dates }) => {
	return (
		<div className="container w-full text-center mx-auto p-4 flex items-center justify-center h-screen">
			<div>
				<BlurIn
					word={
						<p className="text-5xl font-bold max-w-[992px]">
							By acknowledging the inevitability of death,
							<br />
							become obsessed with life.
						</p>
					}
				/>
				<div className="grid grid-cols-2 gap-4 mt-16 max-w-[480px] mx-auto">
					<div>
						<label className="block" htmlFor="dateOfBirth">
							Date of birth
						</label>
						<input
							type="date"
							id="dateOfBirth"
							value={dates.dateOfBirth}
							onChange={handleChange}
							className="border p-2 m-2"
						/>
					</div>
					<div>
						<label className="block" htmlFor="dateOfDie">
							Date of die
						</label>
						<input
							type="date"
							id="dateOfDie"
							value={dates.dateOfDie}
							onChange={handleChange}
							className="border p-2 m-2"
						/>
					</div>
				</div>
			</div>
			<footer className="fixed bottom-0 left-0 w-full p-4">
				<h3>~ Memento mori ~</h3>
			</footer>
			<RetroGrid angle={18} />
		</div>
	);
};
