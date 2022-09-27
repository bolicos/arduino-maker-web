const path = require("path");
const { override, addWebpackAlias, addBundleVisualizer, useBabelRc } = require("customize-cra");

module.exports = override(
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useBabelRc(),
	addWebpackAlias({
	'#': path.resolve(__dirname, './src')
	}),
	addBundleVisualizer({}, true),
);