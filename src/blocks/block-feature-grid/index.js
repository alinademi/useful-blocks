/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['tblocks/block-feature-item'];

registerBlockType('tblocks/block-feature-grid', {
  title: __('Features block'),

  description: __('Provides a parent grid container for feature boxes.'),

  keywords: [__('features'), __('boxes'), __('grid')],

  supports: {
    anchor: true,
    html: true,
    className: false,
  },

  category: 'tblocks',

  icon: 'exerpt-view',

  attributes: {
    content: {
      type: 'string',
    },
  },

  edit: () => {
    return (
      <section class='feat-grid-section'>
        <ul class='feat-list'>
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            placeholder={__('Add items here', 'tblocks')}
          />
        </ul>
      </section>
    );
  },

  save: () => {
    return (
      <section class='feat-grid-section'>
        <ul class='feat-list'>
          <InnerBlocks.Content />
        </ul>
      </section>
    );
  },
});
