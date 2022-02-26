import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];

registerBlockType('tblocks/block-feature-item', {
  title: __('Feature item block'),

  parent: ['tblocks/block-feature-grid'],

  description: __('Provides item block for feature-grid block.'),

  keywords: [__('item'), __('feature'), __('list')],

  supports: {
    anchor: true,
    html: true,
    className: false,
  },

  category: 'tblocks',

  icon: 'plus',

  attributes: {
    content: {
      type: 'string',
    },
  },

  edit: () => {
    return (
      <li class='feat-list__item pop-the-box'>
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
        />
      </li>
    );
  },

  save: () => {
    return (
      <li class='feat-list__item pop-the-box'>
        <InnerBlocks.Content />
      </li>
    );
  },
});
