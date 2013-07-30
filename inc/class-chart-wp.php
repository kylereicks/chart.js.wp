<?php
if(!class_exists('Chart_WP')){
  class Chart_WP{

    // Setup singleton pattern
    public static function get_instance(){
      static $instance;

      if(null === $instance){
        $instance = new self();
      }

      return $instance;
    }

    private function __clone(){
      return null;
    }

    private function __wakeup(){
      return null;
    }

    // Static Methods
    public static function fix_empty_attributes($html){
      return str_replace('=""', '', $html);
    }

    // Deactivation Hook
    public static function deactivate(){
      self::clear_options();
    }

    private static function clear_options(){
      global $wpdb;
      $options = $wpdb->get_col('SELECT option_name FROM ' . $wpdb->options . ' WHERE option_name LIKE \'%chart_wp%\'');
      foreach($options as $option){
        delete_option($option);
      }
    }

    // Constructor
    private function __construct(){
      // Actions
      add_action('init', array($this, 'add_update_hook'));
      add_action('wp_enqueue_scripts', array($this, 'register_scripts'));

      //Filters
      add_filter('the_content', array($this, 'add_chart_canvas'));
    }

    // Actions
    public function add_update_hook(){
      if(get_option('chart_wp_version') !== CHART_WP_VERSION){
        update_option('chart_wp_update_timestamp', time());
        update_option('chart_wp_version', CHART_WP_VERSION);
        do_action('chart_wp_updated');
      }
    }

    public function register_scripts(){
      wp_register_script('chart', CHART_WP_URL . 'js/libs/Chart.min.js', array(), CHART_WP_VERSION, true);
      wp_register_script('chart_init', CHART_WP_URL . 'js/chart-init.js', array('chart'), CHART_WP_VERSION, true);
    }

    // Filters
    public function add_chart_canvas($content){
      $chart_in_post = false;
      $DOMDocument = new DOMDocument;
      $DOMDocument->loadHTML('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' . $content);
      $tables = $DOMDocument->getElementsByTagName('table');

      if($tables->length > 0){
        foreach($tables as $table){
          if(true === $table->hasAttribute('data-chart')){
            $chart_in_post = true;
          }
        }
      }

      if($chart_in_post){
        wp_enqueue_script('chart_init');
      }

      return $content;
    }

  }
}
