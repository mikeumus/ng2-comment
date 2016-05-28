
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
	// '@angular2-material': 'vendor/@angular2-material'
};

/** User packages configuration. */
const packages: string[] = [
	// '@angular2-material/core',
	// '@angular2-material/input',
	// '@angular2-material/button',
];


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
	// Angular specific barrels.
	'@angular/core',
	'@angular/common',
	'@angular/compiler',
	'@angular/http',
	'@angular/platform-browser',
	'@angular/platform-browser-dynamic',
	'@angular/router',
	
	'@angular2-material',
	// '@angular2-material/core',
	// '@angular2-material/toolbar',
	// '@angular2-material/input',
	// '@angular2-material/button',
	// '@angular2-material/icon',
	// '@angular2-material/card',

	// Thirdparty barrels.
	'rxjs',

	// App specific barrels.
	'app'
	// 'app/shared',
	/** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
	cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
	map: {
		'@angular': 'vendor/@angular',
		'@angular2-material': 'vendor/@angular2-material',
		'rxjs': 'vendor/rxjs',
		'main': 'main.js'
	},
	packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });