/**
 * Hashmap of all the colors, their names mapped to their hex values
 */
const colorHex: Record<string, string> = {
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	bisque: "#ffe4c4",
	black: "#000000",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gold: "#ffd700",
	goldenrod: "#daa520",
	gray: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	hotpink: "#ff69b4",
	"indianred ": "#cd5c5c",
	indigo: "#4b0082",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lawngreen: "#7cfc00",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightsteelblue: "#b0c4de",
	lime: "#00ff00",
	limegreen: "#32cd32",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370d8",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#d87093",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	seagreen: "#2e8b57",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	yellow: "#ffff00",
	yellowgreen: "#9acd32",
};

/**
 * The array of the raw color values, without the hashtag in-front of them
 */
const COLOR_HEX_ARRAY = [
	"71b4f0",
	"f0a848",
	"00ffff",
	"5cffc8",
	"9df5f5",
	"f0f07d",
	"ffc682",
	"000000",
	"fad49b",
	"0000ff",
	"8a2be2",
	"a52a2a",
	"deb887",
	"5f9ea0",
	"7fff00",
	"d2691e",
	"ff7f50",
	"6495ed",
	"fae17d",
	"dc143c",
	"00ffff",
	"00008b",
	"008b8b",
	"b8860b",
	"a9a9a9",
	"006400",
	"bdb76b",
	"8b008b",
	"556b2f",
	"ff8c00",
	"9932cc",
	"e9967a",
	"8fbc8f",
	"483d8b",
	"2f4f4f",
	"00ced1",
	"9400d3",
	"ff1493",
	"00bfff",
	"696969",
	"1e90ff",
	"b22222",
	"228b22",
	"ff00ff",
	"dcdcdc",
	"f8f8ff",
	"ffd700",
	"daa520",
	"808080",
	"008000",
	"adff2f",
	"f0fff0",
	"ff69b4",
	"cd5c5c",
	"4b0082",
	"f0e68c",
	"e6e6fa",
	"f58eb0",
	"7cfc00",
	"f7ec83",
	"add8e6",
	"f08080",
	"e0ffff",
	"f0f092",
	"90ee90",
	"d3d3d3",
	"ffb6c1",
	"ffa07a",
	"20b2aa",
	"87cefa",
	"778899",
	"b0c4de",
	"dede76",
	"00ff00",
	"32cd32",
	"f0a254",
	"ff00ff",
	"800000",
	"66cdaa",
	"0000cd",
	"ba55d3",
	"9370d8",
	"3cb371",
	"7b68ee",
	"00fa9a",
	"48d1cc",
	"c71585",
	"191970",
	"ffe4e1",
	"ffe4b5",
	"ffdead",
	"000080",
	"808000",
	"6b8e23",
	"ffa500",
	"ff4500",
	"da70d6",
	"eee8aa",
	"98fb98",
	"afeeee",
	"d87093",
	"fad393",
	"f5bd8c",
	"cd853f",
	"ffc0cb",
	"dda0dd",
	"b0e0e6",
	"800080",
	"663399",
	"ff0000",
	"bc8f8f",
	"4169e1",
	"8b4513",
	"fa8072",
	"2e8b57",
	"ed7b2b",
	"a0522d",
	"c0c0c0",
	"87ceeb",
	"6a5acd",
	"708090",
	"e80909",
	"00ff7f",
	"4682b4",
	"d2b48c",
	"008080",
	"d8bfd8",
	"ff6347",
	"40e0d0",
	"ee82ee",
	"4a4a4a",
	"d98989",
	"d4d40d",
	"9acd32",
];

/**
 * The length of the above array
 */
const COLOR_HEX_ARRAY_LENGTH = COLOR_HEX_ARRAY.length;

export { colorHex, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH };
