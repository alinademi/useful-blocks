<?php

/**
 * Plugin Name: Useful Blocks for trust theme
 * Plugin URI: https://clickstudio.cloud
 * Description: Custom blocks plugin for Trust Immigration.
 * Version: 1.0.0
 * Author: Demi
 *
 * @package tblocks
 */

defined( 'ABSPATH' ) || exit;


/**
 * Load translations (if any) for the plugin from the /languages/ folder.
 * 
 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
 */
add_action( 'init', 'tblocks_load_textdomain' );

function tblocks_load_textdomain() {
	load_plugin_textdomain( 'tblocks', false, basename( __DIR__ ) . '/languages' );
}

/** 
 * Add custom image size for block featured image.
 * 
 * @link https://developer.wordpress.org/reference/functions/add_image_size/
 */

// add_action( 'init', 'tblocks_add_image_size' );

// function tblocks_add_image_size() {
// 	add_image_size( 'tblocksFeatImg', 250, 250, array( 'center', 'center' ) ); 
// }


/** 
 * Add custom "Trust Blocks" block category
 * 
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories', 'tblocks_block_categories', 10, 2 );

function tblocks_block_categories( $categories, $post ) {
	// if ( $post->post_type !== 'landing' ) {
	// 	return $categories;
	// }
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'tblocks',
				'title' => __( 'Trust Blocks', 'tblocks' ),
				'icon'  => 'awards',
			),
		)
	);
}

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action( 'init', 'tblocks_register_blocks' );

function tblocks_register_blocks() {

	// If Block Editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'tblocks-editor-script',											// label
		plugins_url( 'build/index.js', __FILE__ ),						// script file
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-data" ),		// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )		// set version as file last modified time
	);

	// Register the block editor stylesheet.
	wp_register_style(
		'tblocks-editor-styles',											// label
		plugins_url( 'build/editor.css', __FILE__ ),					// CSS file
		array( 'wp-edit-blocks' ),										// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )	// set version as file last modified time
	);

	/* ////////////////////////////////////////////////////////////////
	!! BIG NOTE
	FRONTEND STYLES FOR THIS PLUGIN IS BEING IMPORTED TO THEME'S
	MAIN STYLESHEET FOR EASIER BUNDLING.
	IF YOU WANT TO CANCEL THIS BEHAVIOR YOU MUST UNCOMMENT BELOW 
	wp_register_style FUNCTION
	AS WELL AS 'style' => 'tblocks-front-end-styles' IN register_block_type FUNCTIONS
	BELOW IT THAT REGISTERS AND ENQUEUES FRONTENED STYLES THEN
	COPY AND PASTE CONTENT OF ALL RELATED CSS PARTIALS FROM
	THEME'S css/ modules FOLDER INTO PLUGIN'S build/style.css FILE.
	//////////////////////////////////////////////////////////////// */


	// // Register the front-end stylesheet.
	// wp_register_style(
	// 	'tblocks-front-end-styles',										// label
	// 	plugins_url( 'build/style.css', __FILE__ ),						// CSS file
	// 	array( ),														// dependencies
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )	// set version as file last modified time
	// );

	// Array of block created in this plugin.
	$blocks = [
		'tblocks/block-info-box',
		'tblocks/block-card',
		'tblocks/block-show-hide',
		'tblocks/block-features-grid',
		'tblocks/block-feature-item',
		'tblocks/trust-row',
		'tblocks/trust-column',
	];
	
	// Loop through $blocks and register each block with the same script and styles.
	foreach( $blocks as $block ) {
		register_block_type( $block, array(
			'editor_script' => 'tblocks-editor-script',					// Calls registered script above
			'editor_style' => 'tblocks-editor-styles',				// Calls registered stylesheet above
			// 'style' => 'tblocks-front-end-styles',						// Calls registered stylesheet above
		) );	  
	}

	// Register interview-carousel block.
	register_block_type( 'tblocks/interview-carousel', array(
		'editor_script' => 'tblocks-editor-script',
		'editor_style' => 'tblocks-editor-styles',
		// 'style' => 'tblocks-front-end-styles',
		'render_callback' => 'tblocks_interview_carousel_render_callback'
	) );

	if ( function_exists( 'wp_set_script_translations' ) ) {
	/**
	 * Adds internationalization support. 
	 * 
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
	 * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
	 */
	wp_set_script_translations( 'tblocks-editor-script', 'tblocks', plugin_dir_path( __FILE__ ) . '/languages' );
	}

}

/**
 * Build classes based on block attributes.
 * Returns string of classes.
 * 
 * $attributes - array - Block attributes.
 */
function tblocks_block_classes( $attributes ) {
	$classes = null;
	if ( $attributes['align'] ) {
		$classes = 'align' . $attributes['align'] . ' ';
	}

	if ( $attributes['className'] ) {
		$classes .= $attributes['className']; 
	}

	return $classes;
}

/**
 * Render the saved output from the interview carousel block.
 * $attributes - array - Block attributes.
 * $content - Block inner content.
 * NOTE: it is able to show posts on the backend vai serverside render component
 * but since content editors did not need to make any adjustments,
 * I disabled the editor side and only using callback to query psots on the frontend.
 * Othewise the same functon can be used on the backend as well.
 */
function tblocks_interview_carousel_render_callback( $attributes, $content ) {

	/**
	 * One may argue about this mehtod of enqueueing scripts and styles
	 * in the callback function. But at least for now this is a good way
	 * to implement just in time css. This block is not frequently used.
	 * Also below, inline css is printed directly wihtout enqueueing that is not healthy.
	 * Alternativley instead of all of this we can import it in the theme main js file and 
	 * bebefit form tree shaking and stuff. Likewise for css it canbe handled via theme
	 * like other blocks.
	 */
	wp_enqueue_script(
		'trust-carousel',
		plugin_dir_url( __FILE__ ) . 'build/glide.min.js',
		null,
		filemtime( plugin_dir_path( __FILE__ ) . 'build/glide.min.js' ),
		true
	);

	wp_enqueue_script(
		'interview-carousel-init',
		plugin_dir_url( __FILE__ ) . 'build/glide.init.js',
		null,
		filemtime( plugin_dir_path( __FILE__ ) . 'build/glide.init.js' ),
		true );

	wp_enqueue_style(
		'trust-carousel-core',
		plugin_dir_url( __FILE__ ) . 'build/glide.core.min.css',
		null, filemtime( plugin_dir_path( __FILE__ ) . 'build/glide.core.min.css' ),
		'all'
	);

	global $post;

	// Get the latest posts using wp_get_recent_posts().
	$recent_posts = wp_get_recent_posts ( array(
		'post_type'   => 'interviews',
		// 'category' => 2,
		'numberposts' => 5,
		'post_status' => 'publish',
	) );
	
	$posts_archive_link = get_post_type_archive_link( 'interviews' );
	
	// Check if any posts were returned, if not, say so.
	if ( 0 === count( $recent_posts ) ) {
		return 'No posts.';
	}

	$posts_output = '
	<style>
	.glide__slides{margin-bottom:1.5rem!important;padding-right:0!important}.glide__nav-container{display:flex;justify-content:flex-end;align-items:center}@media only screen and (max-width:480px){.glide__nav-container{justify-content:center}}.glide__slide a{background-image:none!important}.glide__slide__thumb-wrapper img{margin:0!important}.glide__slide__title{margin:.25rem 0 .5rem!important;font-size:1.375rem!important}.glide__slide__excerpt{margin-bottom:.75rem!important}.glide__arrows{display:inline-flex;justify-content:space-between;width:105px;list-style:none;margin:0;z-index:0;padding:0}.glide__arrow{cursor:pointer;color:var(--clr-accent);font-size:1.625rem;width:30px;height:30px;text-align:center;display:flex!important;flex-direction:column;justify-content:center;align-items:center;padding-bottom:1.1rem}.glide__see-all{width:105px;padding:.375rem .5rem!important;margin-right:5px}
	</style>
		<section class="pcb-section border radius p-2 bg-lightgrey">
			<div class="divider-wrapper">
				<span class="divider"></span>
		 	</div>
		 	<h4 class="title-2">Success Stories/ <span class="txt-2">scroll</span></h4>
			<div class="glide peek">
				<div class="glide__track ltr txt-right" data-glide-el="track">
		  			<ul class="glide__slides">';
								
							foreach ($recent_posts as $post) {
								
								$post_id = $post['ID'];

								$posts_output .= '

								<li class="rtl glide__slide">

									<a href="'.get_permalink($post_id).'" class="glide-slide__link column-stretch space-between">

										<figure class="glide__slide__thumb-wrapper radius">'.get_the_post_thumbnail($post_id, 'medium-large', array( 'class' =>'responsive-img' )).'</figure>';

									$posts_output .= '
										<h3 class="glide__slide__title">'.get_the_title($post_id).'</h3>';

									$posts_output .= '
										<p class="glide__slide__excerpt">'.get_the_excerpt($post_id).'</p>';
													
									$posts_output .= '
									</a>

								</li>';
							}

							$posts_output .= '
					</ul>
				</div>
				<div class="glide__nav-container">
					<div class="glide__arrows ltr" data-glide-el="controls">
						<span class="glide__arrow glide__arrow--prev border radius bg-white p-2" data-glide-dir="&lt;">❮</span>
						<span class="glide__arrow glide__arrow--next border radius bg-white p-2" data-glide-dir="&gt;">❯</span>
					</div>
					<a href="'.$posts_archive_link.'" class="glide__see-all border radius bg-white bold">مشاهده همه</a>
				</div>
			</div>

		</section>';
	
	return $posts_output;	
	wp_reset_postdata();
		
	}

add_action('rest_api_init', 'register_rest_images' );
//If you want to show image thumbs of the post on the backend
// currently our block is only a place holder in gutenberg
function register_rest_images(){
    register_rest_field( array('interviews'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}


//to be used later
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}