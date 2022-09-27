const path = require("path");
const { override, addWebpackAlias, addBundleVisualizer } = require("customize-cra");

module.exports = override(
	addWebpackAlias({
	'#': path.resolve(__dirname, 'src')
	}),
	addBundleVisualizer({}, true),
);