const products = [
	// {
	// 	id: 1,
	// 	name: 'Clausing Lathe',
	// 	src: 'clausing-lathe.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	{
		id: 2,
		name: 'Die Spotting Machine',
		src: 'die-spotting-machine.png',
		type: 'equipment',
		status: '',
	},
	{
		id: 3,
		name: 'Economical Fiber Laser',
		src: 'economical-fiber-laser.png',
		type: 'equipment',
		status: '',
	},
	// {
	// 	id: 4,
	// 	name: 'Engraving CNC Machine',
	// 	src: 'engraving-cnc-machine.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 5,
	// 	name: 'Geared Head Drill Press',
	// 	src: 'geared-head-drill-press.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 6,
	// 	name: 'Heat Treat Oven',
	// 	src: 'heat-treat-oven.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 7,
	// 	name: 'Hole Drilling Machine',
	// 	src: 'hole-drilling-machine.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 8,
	// 	name: 'Honing Machine',
	// 	src: 'honing-machine.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 9,
	// 	name: 'Laser Cube',
	// 	src: 'laser-cube.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// { id: 10, name: 'Lathe', src: 'lathe.png', type: 'equipment', status: '' },
	// {
	// 	id: 11,
	// 	name: 'MIG Welder Kit',
	// 	src: 'mig-welder-kit.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 12,
	// 	name: 'Muffle Furnace',
	// 	src: 'muffle-furnace.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 13,
	// 	name: 'OxyAcetylene Kit',
	// 	src: 'oxyacetylene-kit.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 14,
	// 	name: 'Push Press',
	// 	src: 'push-press.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 15,
	// 	name: 'Surface Grinder',
	// 	src: 'surface-grinder.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 16,
	// 	name: 'Surface Grinder Saddle Type',
	// 	src: 'surface-grinder-saddle-type.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 17,
	// 	name: 'Turning Machine',
	// 	src: 'turning-machine.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 18,
	// 	name: 'Vertical Handsaw',
	// 	src: 'vertical-bandsaw.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 19,
	// 	name: 'Vertical Machining Center',
	// 	src: 'vertical-machining-center.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 20,
	// 	name: 'Vertical Mills',
	// 	src: 'vertical-mills.png',
	// 	type: 'equipment',
	// 	status: '',
	// },
	// {
	// 	id: 21,
	// 	name: 'Allen Key Set',
	// 	src: 'allen-key-set.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 22,
	// 	name: 'Ball Peen Hammer',
	// 	src: 'ball-peen-hammer.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// { id: 23, name: 'Caliper', src: 'caliper.png', type: 'tool', status: '' },
	// {
	// 	id: 24,
	// 	name: 'Center Punch',
	// 	src: 'center-punch.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 25,
	// 	name: 'Combination Square Set',
	// 	src: 'combination-square-set.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 26,
	// 	name: 'Dial Indicator',
	// 	src: 'dial-indicator.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// { id: 27, name: 'Drill', src: 'drill.png', type: 'tool', status: '' },
	// {
	// 	id: 28,
	// 	name: 'Edge Finder',
	// 	src: 'edge-finder.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// { id: 29, name: 'Hammer', src: 'hammer.png', type: 'tool', status: '' },
	// {
	// 	id: 30,
	// 	name: 'Micrometer',
	// 	src: 'micrometer.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// { id: 31, name: 'Plier', src: 'plier.png', type: 'tool', status: '' },
	// { id: 32, name: 'Pry Bar', src: 'pry-bar.png', type: 'tool', status: '' },
	// {
	// 	id: 33,
	// 	name: 'Screwdriver',
	// 	src: 'screwdriver.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 34,
	// 	name: 'Tape Measure',
	// 	src: 'tape-measure.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 35,
	// 	name: 'Telescoping Gage Set',
	// 	src: 'telescoping-gage-set.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 36,
	// 	name: 'Thread Pitch Gauge',
	// 	src: 'thread-pitch-gauge.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 37,
	// 	name: 'Thread Wires',
	// 	src: 'thread-wires.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	// {
	// 	id: 38,
	// 	name: 'Transfer Punch Set',
	// 	src: 'transfer-punch-set.png',
	// 	type: 'tool',
	// 	status: '',
	// },
	{ id: 39, name: 'Wrench', src: 'wrench.png', type: 'tool', status: '' },
];

export default products;
