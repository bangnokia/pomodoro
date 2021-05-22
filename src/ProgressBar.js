function ProgressBar({total, className}) {

	const items = [...Array(total).keys()];

	return (
		<div className={className}>
			{
				items.map(
					(index) => <span className="block w-2 h-2 bg-green-500 rounded-full" key={index} />
				)
			}
		</div>
	);
}

export default ProgressBar;