import path from "path";
import { Configuration } from "webpack";

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		configure: (webpackConfig: Configuration) => {
			return webpackConfig;
		},
	},
};
