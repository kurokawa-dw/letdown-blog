<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'kurokawadw_letdown' );

/** Database username */
define( 'DB_USER', 'kurokawadw_wplet' );

/** Database password */
define( 'DB_PASSWORD', 'y9nh5s7g' );

/** Database hostname */
define( 'DB_HOST', 'mysql1006b.xserver.jp' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '8a:3(7Lzc@%]Ddgv&q@5{o$8cIb}9mIl+,T>lSnmJ9*Gte!a?brvR/,W(9azZeZS' );
define( 'SECURE_AUTH_KEY',  'L`x8s.>WJn`U^SPM?U-|jzB$SCir<(iEv(4)jZmh*=~*71%5 &< |%bkbM#Ad|An' );
define( 'LOGGED_IN_KEY',    '&;1fAENvCb4*F2!b4<XmbT[c$Z{dj:`,NrgtyK_/0?X4247IiUaIk,Ya@wj0.kj0' );
define( 'NONCE_KEY',        '`u8=qV^xUF/srF^un4mNV)*;Yn4c}Ehg]FN(}.,YWlW=b@kj^WaVWVIVMqVZk9hN' );
define( 'AUTH_SALT',        '7V.+ZBh^[wLUA/Us##xb /s1`IDjF~0jg&1rRE[UE^7< j>@6^-I(d`;H[z6[u,*' );
define( 'SECURE_AUTH_SALT', 'mSNQ6 8XrI/JmXG}iQX$tYaJG}SQZm5h5^}^wvdS/*)B:rAt 4=D47#hsv~.~AgC' );
define( 'LOGGED_IN_SALT',   'n);/xpC2rlnf}dNEar;p -mFk<1`*<;0!3&.?:/e[4Y$tt^w#H#/RT 5/B #11Tw' );
define( 'NONCE_SALT',       '3V@>!<[$*hmd}E!Jf::AdFg=n|0IR$Qyt4bhS8L$5cj*&u5qpx1%{ 1>l:2{vl}C' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
