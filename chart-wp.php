<?php
/*
Plugin Name: Chart.WP
Plugin URI: http://github.com/kylereicks/chart.wp
Description: A wordpress plugin to use chart.js in posts.
Author: Kyle Reicks
Version: 0.0.0
Author URI: http://github.com/kylereicks/
*/

define('CHART_WP_PATH', plugin_dir_path(__FILE__));
define('CHART_WP_URL', plugins_url('/', __FILE__));
define('CHART_WP_VERSION', '0.0.0');

require_once(CHART_WP_PATH . 'inc/class-chart-wp.php');

register_deactivation_hook(__FILE__, array('Chart_WP', 'deactivate'));

Chart_WP::get_instance();
